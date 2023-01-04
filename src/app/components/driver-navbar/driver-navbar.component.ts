import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityDto } from 'src/app/model/activity-dto.model';
import { AuthService } from 'src/app/services/auth.service';
import { DriverService } from 'src/app/services/driver.service';
import { environment } from 'src/environment/environment';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Ride } from 'src/app/model/ride.model';
import { MatSnackBar } from '@angular/material/snack-bar';

const ACTIVE: string = "ACTIVE";
const INACTIVE: string = "INACTIVE";

@Component({
  selector: 'app-driver-navbar',
  templateUrl: './driver-navbar.component.html',
  styleUrls: ['./driver-navbar.component.css']
})
export class DriverNavbarComponent implements OnInit, AfterViewInit {

  @ViewChild('activeTextContainer') activeTextContainer: ElementRef;
  
  private serverUrl = environment.localhostApi + 'socket';
  private stompClient: any;

  taxiIcon: string = environment.taxiIcon;
  activeText: string = INACTIVE;

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private authService: AuthService,
    private driverService: DriverService,
    private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);

    this.stompClient.connect({}, () => {
      this.openSocket()
    });
  }

  openSocket() {
    this.stompClient.subscribe(`/socket-scheduled-ride`, (rideData: { body: string; }) => {
      this.handleResult(rideData);
    });
  }

  handleResult(rideData: { body: string; }) {
    if (rideData.body) {
      let ride: Ride = JSON.parse(rideData.body);
      if (ride.driver.id == this.authService.getId()) {
        this.snackBar.open("You have new scheduled rides", "Dismiss");
      }
    }
  }

  ngAfterViewInit(): void {
    this.driverService.fetchActivity(this.authService.getId()).subscribe({
      next: (activity: ActivityDto) => {
        this.setActivityDisplay(activity.isActive);
      }
    })
  }

  getHasActiveRide(): boolean {
    return this.driverService.getHasActiveRide();
  }

  getIsActive(): boolean {
    try {
      this.setActivityDisplay(this.driverService.getIsActive());
    } catch (err) {}
    return this.driverService.getIsActive();
  }

  changeActiveState() {
    const newActivityState = !this.driverService.getIsActive();
    this.driverService.changeActivity(this.authService.getId(), { isActive: newActivityState } as ActivityDto).subscribe({
      next: () => {
        this.driverService.setIsActive(newActivityState);
        this.setActivityDisplay(newActivityState);
      }
    })
  }

  setActivityDisplay(isActive: boolean) {
    this.activeText = isActive ? ACTIVE : INACTIVE;
    let color: string = isActive ? "rgb(24, 213, 24)" : "rgb(234, 22, 22)";
    this.renderer.setStyle(
      this.activeTextContainer.nativeElement,
      'color',
      color
    )
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['']);
  }

  navigateToHome() {
    this.router.navigate(['driver-home'])
  }

  navigateToRideHistory() {
    this.router.navigate(['userRideHistory'])
  }

  navigateToProfileInfo() {
    this.router.navigate(['driver-profile'])
  }

}
