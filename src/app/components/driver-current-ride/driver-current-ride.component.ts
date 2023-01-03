import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
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
import { UserService } from 'src/app/services/user.service';
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
  messages: Array<Message> = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private rideService: RideService,
    private dateTimeService: DateTimeService,
    private renderer: Renderer2,
    private router: Router,
    private driverService: DriverService,
    private matDialog: MatDialog,
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
    this.mapComponent.loadMap();
  }

  ngAfterViewInit(): void {
    this.mapComponent.loadMap();
  }

  showNextRoute() {
    if (this.routeIndex < this.routes.length - 1) {
      this.routeIndex++;
      this.mapComponent.removeRoute(this.routes[this.routeIndex]);
      this.mapComponent.showRoute(this.routes[this.routeIndex]);
      this.mapComponent.focusOnPoint(this.routes[this.routeIndex].departure);
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

  openChat() {
    this.matDialog.open(ChatDialogComponent, {
      data: {
        messages: this.messages,
        receiverId: 3
      }
    });
  }

}
