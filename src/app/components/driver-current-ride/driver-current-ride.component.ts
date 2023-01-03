import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from 'src/app/model/location.model';
import { Ride } from 'src/app/model/ride.model';
import { Route } from 'src/app/model/route.model';
import { DateTimeService } from 'src/app/services/date-time.service';
import { DriverService } from 'src/app/services/driver.service';
import { RideService } from 'src/app/services/ride.service';
import { TomTomGeolocationService } from 'src/app/services/tom-tom-geolocation.service';
import { ChatDialogComponent } from '../chat-dialog/chat-dialog.component';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-driver-current-ride',
  templateUrl: './driver-current-ride.component.html',
  styleUrls: ['./driver-current-ride.component.css']
})
export class DriverCurrentRideComponent implements OnInit, AfterViewInit {

  @ViewChild(MapComponent) mapComponent: MapComponent;
  @ViewChild('panicReasonForm') panicReasonForm: ElementRef;

  routes: Array<Route> = [];
  routeIndex: number = -1;
  ride: Ride = {} as Ride;
  rideDate: Date;

  // simulation attributes
  private routePointsToTravelTo: Array<any> = [];
  private routePointIndex: number = 0;
  private simulationIntervalId: any = NaN;
  private currentLocation: Location;

  constructor(
    private activatedRoute: ActivatedRoute,
    private rideService: RideService,
    private dateTimeService: DateTimeService,
    private renderer: Renderer2,
    private router: Router,
    private driverService: DriverService,
    private matDialog: MatDialog,
    private geoLocationService: TomTomGeolocationService) {}

  ngOnInit(): void {
    // TODO: Using the id call the endpoint on backend and get the ride information and display it
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
    this.mapComponent.loadMap();
  }

  ngAfterViewInit(): void {
    this.mapComponent.loadMap();
  }

  showNextRoute() {
    if (this.routeIndex < this.routes.length - 1) {
      if (this.routeIndex == -1) {
        this.currentLocation = this.cloneLocation(this.routes[0].departure);
        this.mapComponent.showMarker(this.currentLocation, 'src/assets/icons8-taxi-96.png');
      }
      this.routeIndex++;
      this.mapComponent.removeRoute(this.routes[this.routeIndex]);
      this.mapComponent.showRoute(this.routes[this.routeIndex]);
      this.mapComponent.focusOnPoint(this.routes[this.routeIndex].departure);
      
      // Setting interval for movement simulation
      this.geoLocationService.getRoute(
        this.routes[this.routeIndex].departure.latitude, this.routes[this.routeIndex].departure.longitude,
        this.routes[this.routeIndex].destination.latitude, this.routes[this.routeIndex].destination.longitude 
      ).subscribe({
        next: (response) => {
          this.routePointsToTravelTo = response.routes[0].legs[0].points;
          const travelLength = response.routes[0].summary.travelTimeInSeconds;
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

  private cloneLocation(location: Location): Location {
    return new Location(
      location.latitude,
      location.longitude,
      location.address
    )
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
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {

        }
      }
    })
  }

  openChat() {
    this.matDialog.open(ChatDialogComponent);
  }

}
