import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityDto } from 'src/app/model/activity-dto.model';
import { AuthService } from 'src/app/services/auth.service';
import { DriverService } from 'src/app/services/driver.service';
import { environment } from 'src/environment/environment';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Ride } from 'src/app/model/ride.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DateTimeService } from 'src/app/services/date-time.service';
import { WorkHour } from 'src/app/model/work-hours';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

const ACTIVE: string = "ACTIVE";
const INACTIVE: string = "INACTIVE";

@Component({
  selector: 'app-driver-navbar',
  templateUrl: './driver-navbar.component.html',
  styleUrls: ['./driver-navbar.component.css']
})
export class DriverNavbarComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('activeTextContainer') activeTextContainer: ElementRef;
  
  private stompClient: any;

  taxiIcon: string = environment.taxiIcon;
  activeText: string = INACTIVE;
  
  isActive: boolean = this.authService.isLoggedIn();

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private authService: AuthService,
    private driverService: DriverService,
    private snackBar: MatSnackBar,
    private dateTimeService: DateTimeService,
    private matDialog: MatDialog) {}

  ngOnDestroy(): void {
    this.stompClient.disconnect();
  }

  ngOnInit() {
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    let ws = new SockJS(environment.socketUrl);
    this.stompClient = Stomp.over(ws);

    const headers = { "Authorization": `Bearer ${this.authService.getToken()}` }
    this.stompClient.connect(headers, () => {
      this.openSocket()
    });
  }

  openSocket() {
    this.stompClient.subscribe(`/socket-scheduled-ride/to-driver/${this.authService.getId()}`, (rideData: { body: string; }) => {
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
    this.setActivityDisplay();
  }

  getHasActiveRide(): boolean {
    return this.driverService.getHasActiveRide();
  }

  changeActiveState() {
    if (this.isActive) {
      this.endShift();
    } else {
      this.startShift();
    }
  }

  private setActivityDisplay() {
    this.activeText = this.isActive ? ACTIVE : INACTIVE;
    let color: string = this.isActive ? "rgb(24, 213, 24)" : "rgb(234, 22, 22)";
    this.renderer.setStyle(
      this.activeTextContainer.nativeElement,
      'color',
      color
    )
  }

  private startShift() {
    const shiftStart = { start: this.dateTimeService.toString(new Date()) };
    this.driverService.startShift(this.authService.getId(), shiftStart).subscribe({
      next: (workHour: WorkHour) => {
        this.isActive = true;
        this.snackBar.open(`Shift started at '${workHour.start}'`, "Dismiss");
        this.setActivityDisplay();
      }, error: (error) => {
        if (error instanceof HttpErrorResponse) {
          this.matDialog.open(DialogComponent, {
            data: {
              header: "Error!",
              body: error.error.message
            }
          });
        }
      }
    });
  }

  private endShift() {
    const shiftEnd = { end: this.dateTimeService.toString(new Date()) };
    this.driverService.endShift(this.authService.getId(), shiftEnd).subscribe({
      next: (workHour: WorkHour) => {
        this.isActive = false;
        this.snackBar.open(`Shift ended at '${workHour.end}'`, "Dismiss");  
        this.setActivityDisplay();
      }, error: (error) => {
        if (error instanceof HttpErrorResponse) {
          this.matDialog.open(DialogComponent, {
            data: {
              header: "Error!",
              body: error.error.message
            }
          });
        }
      }
    });
  }

  logout() {
    this.endShift();
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

  navigateToReportCharts() {
    this.router.navigate(['report-charts'])
  }

}
