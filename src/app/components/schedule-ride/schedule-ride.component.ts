import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Route } from 'src/app/model/route.model';
import { MapComponent } from '../map/map.component';
import { DriverCurrentLocation } from './driver-current-location.model';
import { Location } from 'src/app/model/location.model';
import { FormControl } from '@angular/forms';
import { TomTomGeolocationService } from 'src/app/services/tom-tom-geolocation.service';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environment/environment';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-schedule-ride',
  templateUrl: './schedule-ride.component.html',
  styleUrls: ['./schedule-ride.component.css']
})
export class ScheduleRideComponent {

  @ViewChild(MapComponent) mapComponent: MapComponent;
  
  driverLocations: Array<DriverCurrentLocation> = [];
  route: Route = new Route(
    new Location(NaN, NaN, ""),
    new Location(NaN, NaN, ""),
    NaN,
    NaN
  );
  routes: Array<Route> = [];

  settingInitialDepartureOnClick: boolean = true;  // if false then the next click will set destination marker on map
  disableStartAddressField = false;  // TODO: Rename
  totalDistance: number = 0;
  totalDuration: number = 0;

  @Input() loggedIn: boolean = false;
  @Input() startAddressControl: FormControl = new FormControl("");
  @Input() endAddressControl: FormControl = new FormControl("");

  @Output() showRouteEmitter: EventEmitter<void> = new EventEmitter<void>();
  @Output() disabledStartAddressEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  rideDateControl: FormControl = new FormControl(new Date());
  rideTimeControl: FormControl = new FormControl("");

  constructor(private geoLocationService: TomTomGeolocationService, private matDialog: MatDialog) {

  }
  
  ngOnInit(): void {
    this.driverLocations.push({
      driverId: 1,
      location: new Location(45.2541486, 19.8187217, ""),
      isActive: true
    });
    this.driverLocations.push({
      driverId: 1,
      location: new Location(45.2473693, 19.8187955, ""),
      isActive: false
    });
    this.driverLocations.push({
      driverId: 1,
      location: new Location(45.2558923, 19.8436113, ""),
      isActive: false
    });
    this.driverLocations.push({
      driverId: 1,
      location: new Location(45.2472827, 19.8433833, ""),
      isActive: true
    });
    this.driverLocations.push({
      driverId: 1,
      location: new Location(45.2450728, 19.8408995, ""),
      isActive: false
    });
    this.driverLocations.push({
      driverId: 1,
      location: new Location(45.2445776, 19.8449582, ""),
      isActive: false
    })

    this.mapComponent.loadMap();
  }

  ngAfterViewInit(): void {
    this.mapComponent.loadMap();
    for (let location of this.driverLocations) {
      let carIconSrc = location.isActive ? environment.activeDriverMarker : environment.inactiveDriverMarker;
      this.mapComponent.showMarker(location.location, carIconSrc);
    }
  }

  scheduleRide() {
    const rideDate: Date = this.rideDateControl.value;
    
    // TODO: Validate the time
    const hours: number = +this.rideTimeControl.value.split(":")[0];
    const minutes: number = +this.rideTimeControl.value.split(":")[1];
    rideDate.setHours(hours);
    rideDate.setMinutes(minutes);
    console.log(rideDate);
  }
  
  updateRoute(route: Route) {
    this.route = route;
    this.routes.push(this.cloneRoute(route));  
    // mapComponent.showRoute changes values of passed route for some reason so this emitter fetches that changed data

  }

  goToMaps(): void {
    window.scrollTo(0,document.body.scrollHeight);
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
    
    const isLocationValid = function(location: Location): boolean {
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
    // this.mapComponent.removeMarker(this.route.departure);
    if (!this.disableStartAddressField) {
      this.route.departure = startLocation;
    }
    this.route.destination = endLocation;
    this.mapComponent.showRoute(this.route);
    this.mapComponent.focusOnPoint(this.route.departure);
    this.totalDistance += this.route.distanceInMeters || 0;
    this.totalDuration += this.route.estimatedTimeInMinutes || 0;
    this.goToMaps();
    // this.routes.push(this.cloneRoute(this.route));
    this.route.departure = this.route.destination;
    this.startAddressControl.setValue(this.route.departure.address);
    this.endAddressControl.setValue("");
    this.disableStartAddressField = true;
    this.notifyDisabledStartAddress();
    this.settingInitialDepartureOnClick = false;
  }

  async addMarkerOnClick(onClickLocation: Location) {
    await this.geoLocationService.
      reverseGeocode(onClickLocation.latitude, onClickLocation.longitude)
      .toPromise()
      .then((response) => {
        if (response.addresses.length > 0) {
          const address = response.addresses[0].address
          let fullAddress: string = address.freeformAddress + ", " + address.country;
          onClickLocation.address = fullAddress;
        }
      });

    if (this.settingInitialDepartureOnClick) {
      this.route.departure = onClickLocation;
      this.mapComponent.showMarker(this.route.departure);
      this.settingInitialDepartureOnClick = false;
    } else {
      // this.mapComponent.removeMarker(this.route.departure);  // removing duplicate marker because showRoute places markers automatically
      this.route.destination = onClickLocation;
      this.mapComponent.showMarker(this.route.destination);
      this.mapComponent.showRoute(this.route);
      this.totalDistance += this.route.distanceInMeters || 0;
      this.totalDuration += this.route.estimatedTimeInMinutes || 0;
      // this.routes.push(this.cloneRoute(this.route));
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
    this.mapComponent.removeAllMarkers();

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
        this.mapComponent.removeAllMarkers();
      } else {
        const newLastAddedRoute = this.routes[this.routes.length - 1];
        this.startAddressControl.setValue(newLastAddedRoute.destination.address);
        this.route.departure = newLastAddedRoute.destination;
        this.route.estimatedTimeInMinutes = newLastAddedRoute.estimatedTimeInMinutes;
        this.route.distanceInMeters = newLastAddedRoute.distanceInMeters;
        this.totalDuration -= this.route.estimatedTimeInMinutes;
        this.totalDistance -= this.route.distanceInMeters;
        this.mapComponent.focusOnPoint(this.route.departure);
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
}
