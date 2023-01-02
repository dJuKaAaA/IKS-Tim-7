import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from 'src/app/model/location.model';
import { Ride } from 'src/app/model/ride.model';
import { Route } from 'src/app/model/route.model';
import { DateTimeService } from 'src/app/services/date-time.service';
import { DriverService } from 'src/app/services/driver.service';
import { RideService } from 'src/app/services/ride.service';
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

  constructor(
    private activatedRoute: ActivatedRoute,
    private rideService: RideService,
    private dateTimeService: DateTimeService,
    private renderer: Renderer2,
    private router: Router,
    private driverService: DriverService) {}

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
      console.log(this.routes);
      this.routeIndex++;
      this.mapComponent.removeRoute(this.routes[this.routeIndex]);
      this.mapComponent.showRoute(this.routes[this.routeIndex]);
      this.mapComponent.focusOnPoint(this.routes[this.routeIndex].departure);
      console.log(this.routeIndex);
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
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {

        }
      }
    })
  }

}
