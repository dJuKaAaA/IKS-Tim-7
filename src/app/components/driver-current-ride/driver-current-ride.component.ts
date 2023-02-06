import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from 'src/app/model/location.model';
import { Message } from 'src/app/model/message.model';
import { PaginatedResponse } from 'src/app/model/paginated-response.model';
import { Ride } from 'src/app/model/ride.model';
import { Route } from 'src/app/model/route.model';
import { AuthService } from 'src/app/services/auth.service';
import { DateTimeService } from 'src/app/services/date-time.service';
import { DriverService } from 'src/app/services/driver.service';
import { RideService } from 'src/app/services/ride.service';
import { TomTomGeolocationService } from 'src/app/services/tom-tom-geolocation.service';
import { UserService } from 'src/app/services/user.service';
import { ChatDialogComponent } from '../chat-dialog/chat-dialog.component';
import { MapComponent } from '../map/map.component';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { environment } from 'src/environment/environment';
import { DialogComponent } from '../dialog/dialog.component';
import { NotExpr } from '@angular/compiler';
import { Note } from 'src/app/model/note.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VehicleService } from 'src/app/services/vehicle.service';
import { Vehicle } from 'src/app/model/vehicle.model';
import { TomTomGeolocationResponse } from 'src/app/model/tom-tom-geolocation-response.model';

@Component({
  selector: 'app-driver-current-ride',
  templateUrl: './driver-current-ride.component.html',
  styleUrls: ['./driver-current-ride.component.css']
})
export class DriverCurrentRideComponent implements OnInit, AfterViewInit {

  @ViewChild(MapComponent) mapComponent: MapComponent;
  @ViewChild('panicReasonForm') panicReasonForm: ElementRef;
  
  private stompClient: any;

  routes: Array<Route> = [];
  routeIndex: number = 0;
  ride: Ride = {} as Ride;
  rideDate: Date;
  messages: Array<Message> = [];

  // simulation attributes
  private routePointsToTravelTo: Array<any> = [];
  private routePointIndex: number = 0;
  private simulationIntervalId: any = null;
  private currentLocation: Location;

  panicText: string = "";
  panicErrorMessage: string = "";

  constructor(
    private activatedRoute: ActivatedRoute,
    private rideService: RideService,
    private dateTimeService: DateTimeService,
    private renderer: Renderer2,
    private router: Router,
    private driverService: DriverService,
    private matDialog: MatDialog,
    private geoLocationService: TomTomGeolocationService,
    private userService: UserService,
    private authService: AuthService,
    private vehicleService: VehicleService) {}

  ngOnInit(): void {
    const idUrlParam: any = this.activatedRoute.snapshot.paramMap.get("id");
    const id = (idUrlParam == null) ? -1 : +idUrlParam;
    this.rideService.getRide(id).subscribe({
      next: (ride: Ride) => {
        this.ride = ride;
        this.routes = ride.locations;
        this.rideDate = this.dateTimeService.toDate(this.ride.startTime);
        this.driverService.setHasActiveRide(true);
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {

        }
      }
    })
    // admin id is 1 and this is the support chat with the admin
    this.userService.fetchConversation(1).subscribe({
      next: (response: Array<Message>) => {
        this.messages = response;
      }
    })
    if (localStorage.getItem('activeRideRouteIndex') != null) {
      this.routeIndex = Number(localStorage.getItem('activeRideRouteIndex'));
    }
    if (localStorage.getItem('activeRideRoutePointIndex') != null) {
      this.routePointIndex = Number(localStorage.getItem('activeRideRoutePointIndex'));
    }
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    let ws = new SockJS(environment.socketUrl);
    this.stompClient = Stomp.over(ws);
  }

  sendLocationToSocket() {
    this.stompClient.send("/socket-subscriber/driver/send/current/location", {}, JSON.stringify({
      latitude: this.currentLocation.latitude,
      longitude: this.currentLocation.longitude,
      rideId: this.ride.id,
      passengers: this.ride.passengers
    }));
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.mapComponent.loadMap();
      for (let route of this.ride.locations) {
        this.mapComponent.showRoute(route);
      }
      this.driverService.getVehicle(this.authService.getId()).subscribe({
        next: (vehicle: Vehicle) => {
          this.currentLocation = vehicle.currentLocation;
          this.mapComponent.showMarker(this.currentLocation, environment.taxiMarker);
        }, error: (error) => {
          if (error instanceof HttpErrorResponse) {}
        }
      })
      // starting the simulation
      this.rideSimulation();
    },
      100)
  }

  rideSimulation() {
    // fetching data for movement simulation
    this.geoLocationService.getRoute(
      this.routes[this.routeIndex].departure.latitude, this.routes[this.routeIndex].departure.longitude,
      this.routes[this.routeIndex].destination.latitude, this.routes[this.routeIndex].destination.longitude 
    ).subscribe({
      next: (response) => {
        this.routePointsToTravelTo = response.routes[0].legs[0].points;
        const travelLength = response.routes[0].summary.travelTimeInSeconds;

        // setting interval for movement simulation
        this.simulationIntervalId = setInterval(() => {
          const newLocation = new Location(
            this.routePointsToTravelTo[this.routePointIndex].latitude,
            this.routePointsToTravelTo[this.routePointIndex].longitude,
            ""
          );
          this.updateVehiclePosition(newLocation);
          this.mapComponent.updateMarkerLocation(
            this.currentLocation,
            newLocation);
          this.currentLocation = newLocation;

          // sending information about changed location to socket
          this.sendLocationToSocket();

          ++this.routePointIndex;
          localStorage.setItem('activeRideRoutePointIndex', `${this.routePointIndex}`);

          if (this.routePointIndex >= this.routePointsToTravelTo.length) {
            clearInterval(this.simulationIntervalId);
            if (this.routeIndex <= this.ride.locations.length - 1) {

              ++this.routeIndex;
              localStorage.setItem('activeRideRouteIndex', `${this.routeIndex}`);

              this.routePointIndex = 0;
              localStorage.setItem('activeRideRoutePointIndex', `${this.routePointIndex}`);
              
              this.rideSimulation();
            } else {
              // ride finished -> release items in local storage
              localStorage.removeItem('activeRideRouteIndex');
              localStorage.removeItem('activeRideRoutePointIndex');
            }
          }
        },
        (travelLength / this.routePointsToTravelTo.length) * 1000);
      }
    });

  }

  sendPanic() {
    this.panicErrorMessage = "";
    this.rideService.panicProcedure(this.ride.id, { reason: this.panicText }).subscribe({
      next: (ride: Ride) => {
        // TODO: Decide whether to end the ride or continue 
        this.closePanicReasonTextArea();
        this.matDialog.open(DialogComponent, { 
          data: {
            header: "Panic!",
            body: "Panic successfully sent"
        }})
        console.log(ride);
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          this.panicErrorMessage = error.error.message;
        }
      }
    })

  }

  openPanicReasonTextArea() {
    this.renderer.setStyle(
      this.panicReasonForm.nativeElement,
      'display',
      'block'
    )
  }

  closePanicReasonTextArea() {
    this.renderer.setStyle(
      this.panicReasonForm.nativeElement,
      'display',
      'none'
    )
    this.panicText = "";
  }

  finishRide() {
    this.rideService.finishRide(this.ride.id).subscribe({
      next: () => {
        if (localStorage.getItem('activeRideRouteIndex') != null) {
          localStorage.removeItem('activeRideRouteIndex');
        }
        if (localStorage.getItem('activeRideRoutePointIndex') != null) {
          localStorage.removeItem('activeRideRoutePointIndex');

        }
        clearInterval(this.simulationIntervalId);
        this.driverService.setHasActiveRide(false);
        this.router.navigate(['driver-home']);
        this.stompClient.send("/socket-subscriber/driver/send/current/location", {}, JSON.stringify({
          latitude: this.currentLocation.latitude,
          longitude: this.currentLocation.longitude,
          rideId: this.ride.id,
          passengers: this.ride.passengers
        }));
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {

        }
      }
    })
  }

  openChat() {
    this.matDialog.open(ChatDialogComponent, {
      data: {
        messages: this.messages,
        receiverId: 1
      }
    });
  }

  async updateVehiclePosition(location: Location) {
    await this.geoLocationService.
      reverseGeocode(location.latitude, location.longitude)
      .toPromise()
      .then((response) => {
        if (response.addresses.length > 0) {
          const address = response.addresses[0].address;
          let fullAddress: string = address.freeformAddress + ", " + address.country;
          location.address = fullAddress;
        }
      });
    let vehicleId: number = NaN;
    await this.driverService
      .getVehicle(this.authService.getId())
      .toPromise()
      .then((response) => {
        vehicleId = response?.id || -1;
      })

    this.vehicleService.setLocation(vehicleId, location).subscribe();
  }

  getTotalDistanceInMeters(): number {
    let distance = 0;
    for (let route of this.ride.locations) {
      distance += route.distanceInMeters;
    }
    return distance;
  }

  getTotalEstimatedTimeInMinutes(): number {
    let estimatedTime = 0;
    for (let route of this.ride.locations) {
      estimatedTime += route.estimatedTimeInMinutes;
    }
    return estimatedTime;
  }

}
