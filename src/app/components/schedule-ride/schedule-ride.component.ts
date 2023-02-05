import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Route } from 'src/app/model/route.model';
import { MapComponent } from '../map/map.component';
import { Location } from 'src/app/model/location.model';
import { FormControl } from '@angular/forms';
import { TomTomGeolocationService } from 'src/app/services/tom-tom-geolocation.service';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environment/environment';
import { DialogComponent } from '../dialog/dialog.component';
import { DriverService } from 'src/app/services/driver.service';
import { DriverLocation } from 'src/app/model/driver-location.model';
import { PaginatedResponse } from 'src/app/model/paginated-response.model';
import { SimpleUser } from 'src/app/model/simple-user.model';
import { PassengerService } from 'src/app/services/passenger.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { VehicleType } from 'src/app/model/vehicle-type';
import { VehicleTypeService } from 'src/app/services/vehicle-type.service';
import { RideRequest } from 'src/app/model/ride-request.model';
import { RideService } from 'src/app/services/ride.service';
import { Ride } from 'src/app/model/ride.model';
import { DateTimeService } from 'src/app/services/date-time.service';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Router } from '@angular/router';
import { create } from 'lodash';
import { FavoriteLocation } from 'src/app/model/favorite-location.model';
import { NgxMatDatetimeContent } from '@angular-material-components/datetime-picker';

@Component({
  selector: 'app-schedule-ride',
  templateUrl: './schedule-ride.component.html',
  styleUrls: ['./schedule-ride.component.css']
})
export class ScheduleRideComponent implements OnInit, AfterViewInit {

  @ViewChild(MapComponent) mapComponent: MapComponent;

  private stompClient: any;

  drivers: Array<DriverLocation> = [];
  route: Route = new Route(
    new Location(NaN, NaN, ""),
    new Location(NaN, NaN, ""),
    NaN,
    NaN
  );
  routes: Array<Route> = [];

  startLocation: Location = new Location(NaN, NaN, "");

  settingInitialDepartureOnClick: boolean = true;  // if false then the next click will set destination marker on map
  disableStartAddressField = false;  // TODO: Rename
  totalDistance: number = 0;
  totalDuration: number = 0;

  passengerInviteInput: string = "";
  invitedPassengers: Array<SimpleUser> = [];
  schedulingPassenger: SimpleUser;

  @Input() loggedIn: boolean = false;
  @Input() startAddressControl: FormControl = new FormControl("");
  @Input() endAddressControl: FormControl = new FormControl("");

  @Output() showRouteEmitter: EventEmitter<void> = new EventEmitter<void>();
  @Output() disabledStartAddressEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  rideTime: string = "";
  invitedPassengerErrorMessage: string = "";

  babyTransport: boolean = false;
  petTransport: boolean = false;

  selectedVehicleType: VehicleType;
  vehicleTypes: Array<VehicleType> = [];

  activeRideId: number = NaN;

  markedAsFavorite: boolean = false;
  favoriteLocationName: string = "";

  markAsFavorite() {
    this.markedAsFavorite = !this.markedAsFavorite;
  }

  constructor(
    private geoLocationService: TomTomGeolocationService,
    private matDialog: MatDialog,
    private driverService: DriverService,
    private passengerService: PassengerService,
    private authService: AuthService,
    private vehicleTypeService: VehicleTypeService,
    private rideService: RideService,
    private dateTimeService: DateTimeService,
    private router: Router) {

  }

  ngOnInit() {
    this.schedulingPassenger = { id: this.authService.getId(), email: this.authService.getEmail() };
    this.invitedPassengers.push(this.schedulingPassenger);
    this.vehicleTypeService.getAll().subscribe({
      next: (vehicleTypes: Array<VehicleType>) => {
        this.vehicleTypes = vehicleTypes;
        if (this.vehicleTypes.length > 0) {
          this.selectedVehicleType = this.vehicleTypes[0];
        }
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {

        }
      }
    });
    this.rideService.getPassengersActiveRide(this.authService.getId()).subscribe({
      next: (ride: Ride) => {
        this.activeRideId = ride.id;
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          this.activeRideId = NaN;
        }
      }
    })
    this.initializeWebSocketConnection();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.mapComponent.loadMap();
      this.driverService.fetchDriverActivityAndLocations().subscribe({
        next: (response: PaginatedResponse<DriverLocation>) => {
          this.drivers = response.results;
          for (let driver of this.drivers) {
            if (driver.isActive) {
              this.mapComponent.showMarker(driver.location, environment.taxiMarker);
            }
          }
        }
      })
    },
      100);
  }

  clearScheduleTime() {
    this.rideTime = "";
  }

  scheduleRide() {
    // getting ride date that the passenger picked
    let immediateScheduling = false;
    let rideDate: Date = new Date();
    this.rideTime = this.rideTime.trim();
    if (this.rideTime) {
      const hours: number = +this.rideTime.split(":")[0];
      const minutes: number = +this.rideTime.split(":")[1];
      rideDate.setHours(hours);
      rideDate.setMinutes(minutes);
    } else {
      immediateScheduling = true;
    }

    // checking if the passenger selected any routes
    if (this.routes.length == 0) {
      this.matDialog.open(DialogComponent, {
        data: {
          header: "Invalid!",
          body: "You must specify at least one route of the ride"
        }
      });
      return;
    }
    if (this.markedAsFavorite && this.favoriteLocationName.trim() == "") {
      this.matDialog.open(DialogComponent, {
        data: {
          header: "Invalid!",
          body: "Favorite location name must be provided"
        }
      });
      return;
    }

    const rideRequest: RideRequest = {
      scheduledTime: immediateScheduling ? undefined : this.dateTimeService.toString(rideDate),
      locations: this.routes,
      passengers: this.invitedPassengers,
      vehicleType: this.selectedVehicleType.name,
      babyTransport: this.babyTransport,
      petTransport: this.petTransport
    }

    const favoriteLocation: FavoriteLocation = {
      favoriteName: this.favoriteLocationName,
      scheduledTime: immediateScheduling ? undefined : this.dateTimeService.toString(rideDate),
      locations: this.routes,
      passengers: this.invitedPassengers,
      vehicleType: this.selectedVehicleType.name,
      babyTransport: this.babyTransport,
      petTransport: this.petTransport
    }

    this.rideService.createRide(rideRequest).subscribe({
      next: (result: Ride) => {
        this.matDialog.open(DialogComponent, {
          data: {
            header: "Success!",
            body: "Ride successfully scheduled"
          }
        });
        this.stompClient.send("/socket-subscriber/send/scheduled/ride", {}, JSON.stringify(result));

        if (this.markedAsFavorite) {
          this.rideService.createFavoriteLocation(favoriteLocation).subscribe({
            next: () => {
                this.matDialog.open(DialogComponent, {
                  data: {
                    header: "Success!",
                    body: "Successfully added to favorite locations"
                  }
                });
            }, error: (error) => {
              if (error instanceof HttpErrorResponse) {
                this.matDialog.open(DialogComponent, {
                  data: {
                    header: "Could not create favorite location but scheduled the ride",
                    body: error.error.message
                  }
                });
              }
            }
          })
        }
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          // TODO: Show dialogs for errors after actual schedule ride functionality is implemented
          this.matDialog.open(DialogComponent, {
            data: {
              header: "Error!",
              body: error.error.message
            }
          });
        }
      }
    });
  }

  updateRoute(route: Route) {
    // mapComponent.showRoute changes values of passed route for some reason so this emitter fetches that changed data
    this.route = route;
    this.routes.push(this.cloneRoute(route));
  }

  async showRouteFromAddresses() {
    let startAddress = this.startAddressControl.value || "";
    let endAddress = this.endAddressControl.value || "";
    if (startAddress == "" || endAddress == "") {
      this.matDialog.open(DialogComponent, {
        data: {
          header: "Empty address!",
          body: "Address can't be empty"
        }
      });
      return;
    }

    const isLocationValid = function (location: Location): boolean {
      return (Number.isNaN(location.longitude) || Number.isNaN(location.latitude));
    }

    let startLocation: Location = new Location(NaN, NaN, "");
    let endLocation: Location = new Location(NaN, NaN, "");
    await this.geoLocationService
      .getGeocode(startAddress)
      .toPromise()
      .then((response: any) => {
        const address: string = response.results[0].address.freeformAddress + ", " + response.results[0].address.country;
        startLocation = new Location(
          response.results[0].position.lat,
          response.results[0].position.lon,
          address);
      });
    await this.geoLocationService
      .getGeocode(endAddress)
      .toPromise()
      .then((response: any) => {
        const address: string = response.results[0].address.freeformAddress + ", " + response.results[0].address.country;
        endLocation = new Location(
          response.results[0].position.lat,
          response.results[0].position.lon,
          address);
      });

    if (isLocationValid(startLocation) || isLocationValid(endLocation)) {
      this.matDialog.open(DialogComponent, {
        data: {
          header: "Route not found!",
          body: "Could not find route based on the addresses"
        }
      });
      return;
    }

    // after validations, we show the route on the map
    if (!this.disableStartAddressField) {
      this.route.departure = startLocation;
      this.startLocation = startLocation;
    }
    this.route.destination = endLocation;

    await this.mapComponent.showRoute(this.cloneRoute(this.route));
    this.mapComponent.focusOnPoint(this.route.departure);
    this.totalDistance += this.route.distanceInMeters || 0;
    this.totalDuration += this.route.estimatedTimeInMinutes || 0;
    this.disableStartAddressField = true;
    this.notifyDisabledStartAddress();
    this.settingInitialDepartureOnClick = false;
    this.route.departure = this.route.destination;
    this.route.destination = new Location(NaN, NaN, "");
    this.startAddressControl.setValue(this.route.departure.address);
    this.endAddressControl.setValue("");
  }

  async addMarkerOnClick(onClickLocation: Location) {
    await this.geoLocationService.
      reverseGeocode(onClickLocation.latitude, onClickLocation.longitude)
      .toPromise()
      .then((response) => {
        if (response.addresses.length > 0) {
          const address = response.addresses[0].address;
          let fullAddress: string = address.freeformAddress + ", " + address.country;
          onClickLocation.address = fullAddress;
        }
      });

    if (this.settingInitialDepartureOnClick) {
      this.route.departure = onClickLocation;
      this.mapComponent.showMarker(this.route.departure);
      this.settingInitialDepartureOnClick = false;
      this.startLocation = onClickLocation;
    } else {
      this.route.destination = onClickLocation;
      this.mapComponent.showMarker(this.route.destination);
      await this.mapComponent.showRoute(this.cloneRoute(this.route));
      this.totalDistance += this.route.distanceInMeters || 0;
      this.totalDuration += this.route.estimatedTimeInMinutes || 0;
      this.route.departure = this.route.destination;
      this.startAddressControl.setValue(this.route.departure.address);
      this.disableStartAddressField = true;
      this.notifyDisabledStartAddress();
    }
  }

  private cloneRoute(route: Route): Route {  // TODO: Place this method somewhere more appropriate
    return new Route(
      new Location(route.departure.latitude, route.departure.longitude, route.departure.address),
      new Location(route.destination.latitude, route.destination.longitude, route.destination.address),
      route.distanceInMeters,
      route.estimatedTimeInMinutes
    );
  }

  clearAllRoutes() {
    for (let route of this.routes) {
      this.mapComponent.removeRoute(route);
    }
    this.routes = [];
    this.route = new Route(
      new Location(NaN, NaN, ""),
      new Location(NaN, NaN, ""),
      NaN,
      NaN
    );
    this.startAddressControl.setValue("");
    this.settingInitialDepartureOnClick = true;
    this.disableStartAddressField = false;
    this.notifyDisabledStartAddress();
    this.totalDistance = 0;
    this.totalDuration = 0;
    this.mapComponent.removeMarker(this.startLocation);
    this.startLocation = new Location(NaN, NaN, "");
  }

  clearLastRoute() {
    if (this.routes.length > 0) {
      const oldLastAddedRoute: Route = this.routes[this.routes.length - 1];
      this.mapComponent.removeRoute(this.routes[this.routes.length - 1]);
      this.routes.pop();
      if (this.routes.length == 0) {
        this.startAddressControl.setValue("");
        this.settingInitialDepartureOnClick = true;
        this.disableStartAddressField = false;
        this.notifyDisabledStartAddress();
        this.totalDistance = 0;
        this.totalDuration = 0;
        this.route = new Route(
          new Location(NaN, NaN, ""),
          new Location(NaN, NaN, ""),
          NaN,
          NaN
        );
        this.mapComponent.removeMarker(this.startLocation);
        this.startLocation = new Location(NaN, NaN, "");
      } else {
        const newLastAddedRoute = this.routes[this.routes.length - 1];
        this.startAddressControl.setValue(newLastAddedRoute.destination.address);
        this.route.departure = newLastAddedRoute.destination;
        this.route.estimatedTimeInMinutes = newLastAddedRoute.estimatedTimeInMinutes;
        this.route.distanceInMeters = newLastAddedRoute.distanceInMeters;
        this.totalDuration -= this.route.estimatedTimeInMinutes;
        this.totalDistance -= this.route.distanceInMeters;
      }
    }
  }

  notifyShowRouteFromAddresses() {
    this.showRouteFromAddresses();
    this.showRouteEmitter.emit();
  }

  notifyDisabledStartAddress() {
    this.disabledStartAddressEmitter.emit(this.disableStartAddressField);
  }

  invitePassenger() {
    // TODO: Find passenger via passed email from backend
    this.passengerInviteInput = this.passengerInviteInput.trim();
    if (this.passengerInviteInput == this.authService.getEmail()) {
      this.matDialog.open(DialogComponent, {
        data: {
          header: "Nice try",
          body: "You can't invite yourself... You are literally invited by default"
        }
      });
      return;
    }
    for (let passenger of this.invitedPassengers) {
      if (passenger.email == this.passengerInviteInput) {
        this.matDialog.open(DialogComponent, {
          data: {
            header: "Present",
            body: "This user is already invited"
          }
        });
        return;
      }
    }
    if (this.invitedPassengers.length >= 5) {
      this.matDialog.open(DialogComponent, {
        data: {
          header: "Max passenger capacity!",
          body: "Max passenger capacity is 5"
        }
      });
      return;
    }
    this.invitedPassengerErrorMessage = "";
    this.passengerService.getByEmail({ id: NaN, email: this.passengerInviteInput }).subscribe({
      next: (passenger: SimpleUser) => {
        this.invitedPassengers.push(passenger);
        this.passengerInviteInput = "";
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          this.invitedPassengerErrorMessage = error.error.message;
        }
      }
    })
  }

  removeInvitedPassenger(email: string) {
    this.invitedPassengers = this.invitedPassengers.filter((passenger: SimpleUser) => {
      if (email == this.authService.getEmail()) {
        this.matDialog.open(DialogComponent, {
          data: {
            header: "Error",
            body: "You can't remove yourself from the ride"
          }
        });
        return true;
      }
      if (passenger.email == email) {
        return false;
      }
      return true;
    })
  }

  getDepartureDate(): string {
    return (new Date()).toDateString();
  }

  getDepartureTime(): string {
    return this.rideTime;
  }

  getEstimatedTimeInMinutes(): number {
    let estimatedTime = 0;
    for (let route of this.routes) {
      estimatedTime += route.estimatedTimeInMinutes;
    }
    return estimatedTime;
  }

  getDistanceInMeters(): number {
    let totalDistance = 0;
    for (let route of this.routes) {
      totalDistance += route.distanceInMeters;
    }
    return totalDistance;
  }


  getEstimatedPrice(): number {
    if (this.routes.length > 0 && this.selectedVehicleType) {
      return Math.round(this.selectedVehicleType.pricePerKm + this.getDistanceInMeters() / 1000 * 120);
    }
    return 0;
  }

  changeBabyTransport() {
    this.babyTransport = !this.babyTransport;
  }

  changePetTransport() {
    this.petTransport = !this.petTransport;
  }

  setVehicleType(vehicleType: VehicleType) {
    this.selectedVehicleType = vehicleType;
  }

  initializeWebSocketConnection() {
    let ws = new SockJS(environment.socketUrl);
    this.stompClient = Stomp.over(ws);
  }

  hasActiveRide(): boolean {
    let hasActiveRide = false;
    try {
      hasActiveRide = this.passengerService.getHasActiveRide();
    } catch (error) {
      hasActiveRide = false;
    }
    return hasActiveRide;
  }

  accessCurrentRide() {
    this.router.navigate([`passenger-current-ride/${this.activeRideId}`]);
  }

}