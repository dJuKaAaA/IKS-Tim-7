import { Component, Input, ViewChild, Renderer2, ElementRef, Output, EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ride } from 'src/app/model/ride.model';
import { Route } from 'src/app/model/route.model';
import { MapComponent } from '../map/map.component';
import { PassengerService } from 'src/app/services/passenger.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { PassengerNarrowedInfo } from 'src/app/model/passenger-narrowed-info.model';
import { RideService } from 'src/app/services/ride.service';
import { DateTimeService } from 'src/app/services/date-time.service';
import { HttpErrorResponse } from '@angular/common/http';
import { DriverService } from 'src/app/services/driver.service';
import { AuthService } from 'src/app/services/auth.service';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { environment } from 'src/environment/environment';

const SHOW_PROFILE_INFO_ANIMATION_TIME: number = 300;
const PASSENGER_INFO_HIDDEN_STATE: string = "hidden";
const PASSENGER_INFO_SHOWN_STATE: string = "shown";

const REJECTION_ANIMATION_TIME: number = 750;
const NOT_REJECTED_STATE: string = 'not-rejected';
const REJECTED_STATE: string = 'rejected';

const ACCEPT_ANIMATION_TIME: number = 250;
const NOT_ACCEPTED_STATE: string = 'not-accepted';
const ACCEPT_MIDDLE_POINT: string = 'middle-accept-point';
const ACCEPTED_STATE: string = 'accepted';


@Component({
  selector: 'app-driver-scheduled-ride-card',
  templateUrl: './driver-scheduled-ride-card.component.html',
  styleUrls: ['./driver-scheduled-ride-card.component.css'],
  animations: [
    trigger('passenger-info-popup', [
      state(PASSENGER_INFO_HIDDEN_STATE, style({
        'transform': 'scale(0) rotate(0deg)'
      })),
      state(PASSENGER_INFO_SHOWN_STATE, style({
        'transform': 'scale(1.0) rotate(360deg)'
      })),
      transition(`${PASSENGER_INFO_HIDDEN_STATE} => ${PASSENGER_INFO_SHOWN_STATE}`, animate(SHOW_PROFILE_INFO_ANIMATION_TIME)),
      transition(`${PASSENGER_INFO_SHOWN_STATE} => ${PASSENGER_INFO_HIDDEN_STATE}`, animate(SHOW_PROFILE_INFO_ANIMATION_TIME))
    ]),
    trigger('rejection-anim', [
      state(NOT_REJECTED_STATE, style({
        'transform': 'scale(1.0) rotate(0deg)'
      })),
      state(REJECTED_STATE, style({
        'transform': 'scale(0) rotate(720deg)',
      })),
      transition(`${NOT_REJECTED_STATE} => ${REJECTED_STATE}`, animate(REJECTION_ANIMATION_TIME))
    ]),
    trigger('accept-anim', [
      state(NOT_ACCEPTED_STATE, style({
        'transform': 'scale(1.0)',
        'opacity': '1.0'
      })),
      state(ACCEPT_MIDDLE_POINT, style({
        'transform': 'scale(1.05)',
        'opacity': '0'
      })),
      state(ACCEPTED_STATE, style({
        'transform': 'scale(1.0)',
        'opacity': '1.0'
      })),
      transition(`${NOT_ACCEPTED_STATE} => ${ACCEPT_MIDDLE_POINT}`, animate(ACCEPT_ANIMATION_TIME)),
      transition(`${ACCEPT_MIDDLE_POINT} => ${ACCEPTED_STATE}`, animate(ACCEPT_ANIMATION_TIME))
    ]),

  ]
})
export class DriverScheduledRideCardComponent implements OnInit, AfterViewInit {

  private serverUrl = environment.localhostApi + 'socket';
  private stompClient: any;

  @Input() ride: Ride = {} as Ride;
  @Input() mapComponent: MapComponent;

  @Output() rejectionEmitter: EventEmitter<Ride> = new EventEmitter<Ride>();

  displayedPassenger: PassengerNarrowedInfo = {
    email: "",
    profilePicture: "",
    fullName: ""
  };

  rejectionReasonText: string = "";
  rejectionErrorMessage: string = "";
  canStartRide: boolean = true;

  @ViewChild('rejectionReasonContainer') rejectionReasonContainer: ElementRef;
  @ViewChild('scheduledRide', { read: ElementRef }) scheduledRide: ElementRef;
  @ViewChild('passengerContainer') passengerContainer: ElementRef;
  @ViewChild('passengerProfileInfo', { read: ElementRef }) passengerProfileInfo: ElementRef;

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private passengerService: PassengerService,
    private rideService: RideService, 
    private dateTimeService: DateTimeService,
    private authService: AuthService,
    private driverService: DriverService) { }

  ngOnInit(): void {
    this.canStartRide = !this.driverService.getHasActiveRide();
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
  }

  ngAfterViewInit(): void {
    // changes the color of cards outline based on time left until start
    let now: Date = new Date();
    let timeDiff = now.getTime() - this.dateTimeService.toDate(this.ride.startTime).getTime();
    let oneMinuteInMiliseconds = 1000 * 60;
    if (timeDiff < 0 && timeDiff >= -oneMinuteInMiliseconds * 15) {
      this.renderer.setStyle(
        this.scheduledRide.nativeElement,
        'box-shadow',
        '0px 0px 15px rgb(204, 116, 0)'
      )

    } else if (timeDiff > 0 && timeDiff <= oneMinuteInMiliseconds * 15) {
      this.renderer.setStyle(
        this.scheduledRide.nativeElement,
        'box-shadow',
        '0px 0px 15px rgb(217, 0, 0)'
      )
    }
  }

  startRide(): void {
    this.rideService.startRide(this.ride.id).subscribe(() => {
      this.driverService.changeActivity(this.authService.getId(), { isActive: false }).subscribe({
        next: () => {
          this.driverService.setIsActive(false);
          this.driverService.setHasActiveRide(true);
          this.router.navigate([`driver-current-ride/${this.ride.id}`]);
        }
      })
    });
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

  updateRoute(updatedRoute: Route) {

  }

  async showRideRoutes() {
    this.mapComponent.removeAllMarkers();
    this.mapComponent.removeAllRouteLayers();
    for (let route of this.ride.locations) {
      await this.mapComponent.showRoute(route);
    }
    this.mapComponent.focusOnPoint(this.ride.locations[0].departure);  // focus departure of first route
  }

  rejectionState: string = NOT_REJECTED_STATE;

  rejectRide() {
    this.rideService.rejectRide(this.ride.id).subscribe((ride: Ride) => {
      // sending information to parent about rejection
      this.rejectionState = REJECTED_STATE;
      setTimeout(() => {
        this.rejectionEmitter.emit(this.ride);
      },
        REJECTION_ANIMATION_TIME);

      // notifying passenger via web sockets
      this.stompClient.send("/socket-subscriber/send/ride/evaluation", {}, JSON.stringify(ride));
    });
  }

  acceptState: string = NOT_ACCEPTED_STATE;

  acceptRide() {
    this.rideService.acceptRide(this.ride.id).subscribe((ride: Ride) => {
      // sending information to parent about acceptance 
      this.acceptState = ACCEPT_MIDDLE_POINT;
      setTimeout(() => {
        this.acceptState = ACCEPTED_STATE
      },
        ACCEPT_ANIMATION_TIME)
      setTimeout(() => {
        this.ride.status = "ACCEPTED";
      }, 
        ACCEPT_ANIMATION_TIME);

      // notifying passenger via web sockets
      this.stompClient.send("/socket-subscriber/send/ride/evaluation", {}, JSON.stringify(ride));
    });
  }

  cancelRide() {
    this.rejectionErrorMessage = "";
    this.rideService.cancelRide(this.ride.id, { reason: this.rejectionReasonText, time: this.dateTimeService.toString(new Date()) }).subscribe({
      next: () => {
      // sending information to parent about cancellation
      this.rejectionState = REJECTED_STATE;
      setTimeout(() => {
        this.rejectionEmitter.emit(this.ride);
      },
        REJECTION_ANIMATION_TIME);
      }, 
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          this.rejectionErrorMessage = error.error.message;
        }
      }
    });
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
    this.passengerService.getNarrowedProfileData(passengerId).subscribe((result: PassengerNarrowedInfo) => {
      this.displayedPassenger = result;
    })

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
    }, SHOW_PROFILE_INFO_ANIMATION_TIME);
    this.passengerPopupState = PASSENGER_INFO_HIDDEN_STATE;
    // clearing displayed passenger info
    this.displayedPassenger = {
      email: "",
      profilePicture: "",
      fullName: ""
    };
  }

}
