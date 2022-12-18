import { Component, Input, ViewChild, Renderer2, ElementRef, Output, EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ride } from 'src/app/model/ride.model';
import { Route } from 'src/app/model/route.model';
import { MapComponent } from '../map/map.component';
import { PassengerService } from 'src/app/services/passenger.service';
import { Passenger } from 'src/app/model/passenger.model';
import { animate, state, style, transition, trigger } from '@angular/animations';

const ANIMATION_TIME: number = 250;
const PASSENGER_INFO_HIDDEN_STATE: string = "hidden";
const PASSENGER_INFO_SHOWN_STATE: string = "shown";
const NOT_REJECTED_STATE: string = 'not-rejected';
const REJECTED_STATE: string = 'rejected';


@Component({
  selector: 'app-driver-scheduled-ride-card',
  templateUrl: './driver-scheduled-ride-card.component.html',
  styleUrls: ['./driver-scheduled-ride-card.component.css'],
  animations: [
    trigger('passenger-info-popup',[
      state(PASSENGER_INFO_HIDDEN_STATE, style({
        'transform': 'scale(0)'
      })),
      state(PASSENGER_INFO_SHOWN_STATE, style({
        'transform': 'scale(1.0)'
      })),
      transition(`${PASSENGER_INFO_HIDDEN_STATE} => ${PASSENGER_INFO_SHOWN_STATE}`, animate(ANIMATION_TIME)),
      transition(`${PASSENGER_INFO_SHOWN_STATE} => ${PASSENGER_INFO_HIDDEN_STATE}`, animate(ANIMATION_TIME))
    ]),
    trigger('rejection-anim',[
      state(NOT_REJECTED_STATE, style({
        'transform': 'scale(1.0)'
      })),
      state(REJECTED_STATE, style({
        'transform': 'scale(0)'
      })),
      transition(`${NOT_REJECTED_STATE} => ${REJECTED_STATE}`, animate(ANIMATION_TIME))
    ])
  ]
})
export class DriverScheduledRideCardComponent implements AfterViewInit {

  @Input() ride: Ride = {} as Ride;
  @Input() mapComponent: MapComponent;
  
  @Output() rejectionEmitter: EventEmitter<Ride> = new EventEmitter<Ride>();

  displayedPassenger: Passenger = {
    id: 0,
    name: "Pera",
    surname: "Peric",
    profilePicture: "src/assets/profileImage.jpg",
    telephoneNumber: "",
    email: "pera.peric@gmail.com",
    address: "",
    password: "",
  };

  rejectionReasonText: string = "";

  @ViewChild('rejectionReasonContainer') rejectionReasonContainer: ElementRef;
  @ViewChild('scheduledRide', { read: ElementRef })  scheduledRide: ElementRef;
  @ViewChild('passengerContainer') passengerContainer: ElementRef;
  @ViewChild('passengerProfileInfo', { read: ElementRef }) passengerProfileInfo: ElementRef;

  constructor(private router: Router, private renderer: Renderer2) {}
  
  ngAfterViewInit(): void {
    // changes the color of cards outline based on time left until start
    let now: Date = new Date();
    let timeDiff = now.getTime() - this.ride.startTime.getTime();
    let minuteInMiliseconds = 1000 * 60;
    if (timeDiff > 0 && timeDiff <= minuteInMiliseconds * 15) {
      this.renderer.setStyle(
        this.scheduledRide.nativeElement,
        'box-shadow',
        '0px 0px 15px rgb(204, 116, 0)'
      )

    } else if (timeDiff < 0 && timeDiff >= -minuteInMiliseconds * 15) {
      this.renderer.setStyle(
        this.scheduledRide.nativeElement,
        'box-shadow',
        '0px 0px 15px rgb(217, 0, 0)'
      )
    }
  }

  startRide(): void {
    this.router.navigate([`driver-current-ride/${this.ride.id}`])
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
    for (let route of this.ride.locations) {
      let r: Route = new Route(route.departure, route.destination, route.distanceInMeters, route.estimatedTimeInMinutes);
      this.mapComponent.removeRoute(r);
      this.mapComponent.showRoute(r);
    }
    this.mapComponent.focusOnPoint(this.ride.locations[0].departure);  // focus departure of first route
  }

  rejectionState: string = NOT_REJECTED_STATE;

  notifyAboutRejection() {
    // TODD: Send information to database about rejection
    // sending information to parent about rejection
    this.rejectionState = REJECTED_STATE;
    setTimeout(() => {
      this.rejectionEmitter.emit(this.ride);
    },
    ANIMATION_TIME);
  }

  passengerPopupState: string = PASSENGER_INFO_HIDDEN_STATE;

  showPassengerInfo(passengerId: number) {
    this.renderer.setStyle(
      this.passengerContainer.nativeElement,
      'display',
      'none'
    )
    this.renderer.setStyle(
      this.passengerProfileInfo.nativeElement,
      'display',
      'block'
    )
    this.passengerPopupState = PASSENGER_INFO_SHOWN_STATE;
    // TODO: Load passenger data
  }

  hidePassengerInfo() {
    setTimeout(() => {
      this.renderer.setStyle(
        this.passengerContainer.nativeElement,
        'display',
        'block'
      )
      this.renderer.setStyle(
        this.passengerProfileInfo.nativeElement,
        'display',
        'none'
      )
    }, ANIMATION_TIME);
    this.passengerPopupState = PASSENGER_INFO_HIDDEN_STATE;
    // TODO: Clear passenger info
  }


}
