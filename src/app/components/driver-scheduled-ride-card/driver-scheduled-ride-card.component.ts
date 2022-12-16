import { Component, Input, ViewChild, Renderer2, ElementRef, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Ride } from 'src/app/model/ride.model';
import { Route } from 'src/app/model/route.model';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-driver-scheduled-ride-card',
  templateUrl: './driver-scheduled-ride-card.component.html',
  styleUrls: ['./driver-scheduled-ride-card.component.css']
})
export class DriverScheduledRideCardComponent {

  @Input() ride: Ride = {} as Ride;
  @Input() mapComponent: MapComponent;
  
  @Output() rejectionEmitter: EventEmitter<Ride> = new EventEmitter<Ride>();

  rejectionReasonText: string = "";

  @ViewChild('rejectionReasonContainer') rejectionReasonContainer: ElementRef; 

  constructor(private router: Router, private renderer: Renderer2) {}

  startRide(): void {
    this.router.navigate(['driver-current-ride'])
  }

  showRejectionReason(): void {
    if (this.rejectionReasonContainer != null) {
      this.renderer.setStyle(
        this.rejectionReasonContainer.nativeElement,
        'display',
        'block'
      )
    }
  }

  hideRejectionReason(): void {
    if (this.rejectionReasonContainer != null) {
      this.renderer.setStyle(
        this.rejectionReasonContainer.nativeElement,
        'display',
        'none'
      )
      this.rejectionReasonText = "";
    }
  } 

  showRideRoutes() {
    this.mapComponent.clearMap();
    for (let route of this.ride.locations) {
      let r: Route = new Route(route.departure, route.destination, route.distanceInMeters); 
      this.mapComponent.showRoute(r);
    }
    this.mapComponent.focusOnPoint(this.ride.locations[0].departure);  // focus departure of first route
  }

  notifyAboutRejection() {
    // TODD: Send information to database about rejection
    // sending information to parent about rejection
    this.rejectionEmitter.emit(this.ride);
  }

}
