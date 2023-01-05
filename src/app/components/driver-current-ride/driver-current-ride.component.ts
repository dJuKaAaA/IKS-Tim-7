import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
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

@Component({
  selector: 'app-driver-current-ride',
  templateUrl: './driver-current-ride.component.html',
  styleUrls: ['./driver-current-ride.component.css']
})
export class DriverCurrentRideComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MapComponent) mapComponent: MapComponent;
  @ViewChild('panicReasonForm') panicReasonForm: ElementRef;
  
  private serverUrl = environment.localhostApi + 'socket';
  private stompClient: any;

  routes: Array<Route> = [];
  routeIndex: number = -1;
  ride: Ride = {} as Ride;
  rideDate: Date;
  messages: Array<Message> = [];

  // simulation attributes
  private routePointsToTravelTo: Array<any> = [];
  private routePointIndex: number = 0;
  private simulationIntervalId: any = null;
  private currentLocation: Location;
  

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
    private authService: AuthService) {}

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
    this.userService.fetchMessages(2).subscribe({  // TODO: Change to this.authService.getId()
      next: (response: PaginatedResponse<Message>) => {
        this.messages = response.results;
      }
    })
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
  }

  sendLocationToSocket() {
    this.stompClient.send("/socket-subscriber/driver/send/current/location", {}, JSON.stringify({
      latitude: this.currentLocation.latitude,
      longitude: this.currentLocation.longitude,
      rideId: this.ride.id,
      rideFinished: this.routeIndex >= this.routes.length - 1 && this.routePointIndex >= this.routePointsToTravelTo.length - 1
    }));
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.mapComponent.loadMap();
    },
      100)
  }


  ngOnDestroy(): void {
    if (this.simulationIntervalId != null && this.routePointIndex < this.routePointsToTravelTo.length) {
      clearInterval(this.simulationIntervalId);
    }
  }

  showNextRoute() {
    if (this.routeIndex < this.routes.length - 1) {
      this.routeIndex++;

      // initializing car icon on map
      if (this.routeIndex == 0) {
        this.currentLocation = this.routes[0].departure;
        this.mapComponent.showMarker(this.currentLocation, 'src/assets/icons8-taxi-96.png');
      }

      // removing previous and showing current route
      this.mapComponent.removeRoute(this.routes[this.routeIndex]);
      this.mapComponent.showRoute(this.routes[this.routeIndex]);
      this.mapComponent.focusOnPoint(this.routes[this.routeIndex].departure);
      
      // fetching data for movement simulation
      this.geoLocationService.getRoute(
        this.routes[this.routeIndex].departure.latitude, this.routes[this.routeIndex].departure.longitude,
        this.routes[this.routeIndex].destination.latitude, this.routes[this.routeIndex].destination.longitude 
      ).subscribe({
        next: (response) => {
          this.routePointIndex = 0;
          this.routePointsToTravelTo = response.routes[0].legs[0].points;
          const travelLength = response.routes[0].summary.travelTimeInSeconds;

          // setting interval for movement simulation
          this.simulationIntervalId = setInterval(() => {
            const newLocation = new Location(
              this.routePointsToTravelTo[this.routePointIndex].latitude,
              this.routePointsToTravelTo[this.routePointIndex].longitude,
              ""
            );
            this.mapComponent.updateMarkerLocation(
              this.currentLocation,
              newLocation);
            this.currentLocation = newLocation;

            // sending information about changed location to socket
            this.sendLocationToSocket();

            ++this.routePointIndex;
            if (this.routePointIndex >= this.routePointsToTravelTo.length) {
              clearInterval(this.simulationIntervalId);
            }
          },
          (travelLength / this.routePointsToTravelTo.length) * 1000);
        }
      })
    }
  }

  sendPanic() {

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
  }

  finishRide() {
    this.rideService.finishRide(this.ride.id).subscribe({
      next: (ride) => {
        this.driverService.setHasActiveRide(false);
        this.router.navigate(['driver-home']);
        this.driverService.changeActivity(this.authService.getId(), { isActive: true }).subscribe(() => {
          this.driverService.setIsActive(true);
        });
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
        receiverId: 3
      }
    });
  }

}
