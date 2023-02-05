import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { environment } from 'src/environment/environment';
import { Ride } from 'src/app/model/ride.model';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RideService } from 'src/app/services/ride.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { PassengerService } from 'src/app/services/passenger.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FinishedRideDialogComponent } from '../finished-ride-dialog/finished-ride-dialog.component';

@Component({
  selector: 'app-passenger-navbar',
  templateUrl: './passenger-navbar.component.html',
  styleUrls: ['./passenger-navbar.component.css']
})
export class PassengerNavbarComponent implements OnInit, OnDestroy {

  private stompClient: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private rideService: RideService,
    private matDialog: MatDialog,
    private passengerService: PassengerService) {}

  ngOnDestroy(): void {
    this.stompClient.disconnect();
  }

  ngOnInit(): void {
    this.initializeWebSocketConnection();
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['']);
  }

  navigateToHome() {
    this.router.navigate(['passenger-home'])
  }

  navigateToRideHistory() {
    this.router.navigate(['userRideHistory'])
  }

  navigateToFavoriteLocations() {
    this.router.navigate(['favorite-locations']);
  }

  navigateToProfileInfo() {
    this.router.navigate(['passenger-profile'])
  }
  
  navigateToReportCharts() {
    this.router.navigate(['report-charts'])
  }

  initializeWebSocketConnection() {
    let ws = new SockJS(environment.socketUrl);
    this.stompClient = Stomp.over(ws);

    const headers = { "Authorization": `Bearer ${this.authService.getToken()}` }
    console.log(this.authService.getToken())
    this.stompClient.connect(headers, () => {
      this.openSocket()
    });
  }

  openSocket() {
    this.stompClient.subscribe(`/socket-ride-evaluation/${this.authService.getId()}`,
     (rideData: { body: string; }) => {
      this.handleResultRideEvaluation(rideData);
    });
    this.stompClient.subscribe(`/socket-scheduled-ride/to-passenger/${this.authService.getId()}`,
     (rideData: { body: string; }) => {
      this.handleResultRideInvitation(rideData);
    });
    this.stompClient.subscribe(`/socket-driver-movement/to-passenger/${this.authService.getId()}`,
     (data: { body: string; }) => {
      this.handleResultActiveRideFinished(data);
    });
    this.stompClient.subscribe(`/socket-notify-start-ride/${this.authService.getId()}`,
     (rideData: { body: string; }) => {
      this.handleResultStartedRide(rideData);
    });
    this.stompClient.subscribe(`/socket-notify-arrived-at-departure/${this.authService.getId()}`,
     (rideData: { body: string; }) => {
      this.handleResultArrivedAtDeparture(rideData);
    });
    
  }

  handleResultRideEvaluation(rideData: { body: string; }) {
    if (rideData.body) {
      let ride: Ride = JSON.parse(rideData.body);
      if (ride.status == "ACCEPTED") {
        this.snackBar.open(`Your ride scheduled at '${ride.startTime}' has been ${ride.status}`, "Dismiss");
      } else {
        this.snackBar.open(`Your ride scheduled at '${ride.startTime}' has been ${ride.status}\nReason: ${ride.rejection.reason}`, "Dismiss");
      }
    }
  }

  handleResultRideInvitation(rideData: { body: string; }) {
    if (rideData.body) {
      let ride: Ride = JSON.parse(rideData.body);
      this.snackBar.open(`You have been invited to join the ride scheduled at '${ride.startTime}'`, "Dismiss");
    }
  }

  handleResultActiveRideFinished(data: { body: string }) {
    if (data.body) {
      const information = JSON.parse(data.body);

      this.rideService.getPassengersActiveRide(this.authService.getId()).subscribe({
        error: (error) => {
          /* if this method is called and the passenger doesn't have an active ride; then ride 
           * that was recently active was marked as finished */
          if (error instanceof HttpErrorResponse) {
            this.matDialog.open(FinishedRideDialogComponent, {
              data: {
                rideId: information.rideId
              }
            });
            this.passengerService.setHasActiveRide(false);
            this.router.navigate(['passenger-home']);
          }
        }
      })
    }
  }

  handleResultStartedRide(rideData: { body: string }) {
    if (rideData.body) {
      let ride: Ride = JSON.parse(rideData.body);
      this.router.navigate([`passenger-current-ride/${ride.id}`])
      this.snackBar.open(`The driver has started the ride`, "Dismiss");
      this.passengerService.setHasActiveRide(true);
    }
  }

  handleResultArrivedAtDeparture(rideData: { body: string }) {
    if (rideData.body) {
      let ride: Ride = JSON.parse(rideData.body);
      this.matDialog.open(DialogComponent, {
        data: {
          header: "Driver arrived at departure point!",
          body: `Driver arrived at ${ride.locations[0].departure.address}`
        }
      });
      this.passengerService.setHasActiveRide(true);
    }
  }

  

}
