import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { environment } from 'src/environment/environment';
import { Ride } from 'src/app/model/ride.model';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-passenger-navbar',
  templateUrl: './passenger-navbar.component.html',
  styleUrls: ['./passenger-navbar.component.css']
})
export class PassengerNavbarComponent implements OnInit {

  private serverUrl = environment.localhostApi + 'socket';
  private stompClient: any;

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar) {}

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

  navigateToProfileInfo() {
    this.router.navigate(['passenger-profile'])
  }


  initializeWebSocketConnection() {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);

    this.stompClient.connect({}, () => {
      this.openSocket()
    });
  }

  openSocket() {
    this.stompClient.subscribe('/socket-ride-evaluation', (rideData: { body: string; }) => {
      this.handleResultRideEvaluation(rideData);
    });
    this.stompClient.subscribe('/socket-scheduled-ride', (rideData: { body: string; }) => {
      this.handleResultRideInvitation(rideData);
    });
  }

  handleResultRideEvaluation(rideData: { body: string; }) {
    if (rideData.body) {
      let ride: Ride = JSON.parse(rideData.body);
      for (let passenger of ride.passengers) {
        if (this.authService.getId() == passenger.id) {
          this.snackBar.open(`Your ride scheduled at '${ride.startTime}' has been ${ride.status}`, "Dismiss");
          break;
        }
      }
    }
  }

  handleResultRideInvitation(rideData: { body: string; }) {
    if (rideData.body) {
      let ride: Ride = JSON.parse(rideData.body);
      for (let passenger of ride.passengers) {
        if (this.authService.getId() == passenger.id) {
          this.snackBar.open(`You have been invited to join the ride scheduled at '${ride.startTime}'`, "Dismiss");
          break;
        }
      }
    }
  }

}
