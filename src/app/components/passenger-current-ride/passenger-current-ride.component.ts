import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Message } from 'src/app/model/message.model';
import { PaginatedResponse } from 'src/app/model/paginated-response.model';
import { Ride } from 'src/app/model/ride.model';
import { Route } from 'src/app/model/route.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { ChatDialogComponent } from '../chat-dialog/chat-dialog.component';
import { MapComponent } from '../map/map.component';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { environment } from 'src/environment/environment';
import { ActivatedRoute } from '@angular/router';
import { RideService } from 'src/app/services/ride.service';
import { DateTimeService } from 'src/app/services/date-time.service';
import { HttpErrorResponse } from '@angular/common/http';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { Location } from 'src/app/model/location.model';
import { DialogComponent } from '../dialog/dialog.component';
import { Note } from 'src/app/model/note.model';
import { DriverService } from 'src/app/services/driver.service';
import { DriverActivityAndLocation } from 'src/app/model/driver-activity-and-locations.model';

@Component({
  selector: 'app-passenger-current-ride',
  templateUrl: './passenger-current-ride.component.html',
  styleUrls: ['./passenger-current-ride.component.css']
})
export class PassengerCurrentRideComponent implements OnInit {

  @ViewChild(MapComponent) mapComponent: MapComponent;

  ride: Ride;
  messages: Array<Message> = [];
  rideDate: Date;

  private serverUrl = environment.localhostApi + 'socket';
  private stompClient: any;

  private currentLocation: Location;

  panicText: string = "";
  panicErrorMessage: string = "";
  @ViewChild('panicReasonForm') panicReasonForm: ElementRef;

  reportText: string = "";
  reportErrorMessage: string = "";
  @ViewChild('reportForm') reportForm: ElementRef;

  constructor(
    private matDialog: MatDialog, 
    private authService: AuthService, 
    private userService: UserService, 
    private activatedRoute: ActivatedRoute,
    private rideService: RideService,
    private dateTimeService: DateTimeService,
    private renderer: Renderer2,
    private driverService: DriverService) {}

  ngOnInit(): void {
    const idUrlParam: any = this.activatedRoute.snapshot.paramMap.get("id");
    const id = (idUrlParam == null) ? -1 : +idUrlParam;
    this.rideService.getRide(id).subscribe({
      next: (ride: Ride) => {
        this.ride = ride;
        this.rideDate = this.dateTimeService.toDate(this.ride.startTime);
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {

        }
      }
    })
    this.userService.fetchMessages(this.authService.getId()).subscribe({
      next: (response: PaginatedResponse<Message>) => {
        this.messages = response.results;
      }
    })
    this.initializeWebSocketConnection();
  }

  getTotalEstimatedTime() {
    let totalEstimatedTime: number = 0;
    for (let route of this.ride.locations) {
      totalEstimatedTime += route.estimatedTimeInMinutes;
    }
    return totalEstimatedTime;
  }

  getTotalDistanceInMeters() {
    let totalDistanceInMeters: number = 0;
    for (let route of this.ride.locations) {
      totalDistanceInMeters += route.distanceInMeters;
    }
    return totalDistanceInMeters;
  }

  async ngAfterViewInit() {
    setTimeout(async () => {
      this.mapComponent.loadMap();
      await this.driverService
        .fetchDriverActivityAndLocations()
        .toPromise()
        .then((response) => {
          if (response == undefined) {
            return;
          }
          for (let driver of response.results) {
            if (driver.driverId == this.ride.driver.id) {
              this.mapComponent.showMarker(driver.location, 'src/assets/icons8-taxi-96.png');
              this.currentLocation = driver.location;
            }
          }
      }).catch((error) => {
        if (error instanceof HttpErrorResponse) {}
      })
      for (let route of this.ride.locations) {
        setTimeout(async () => {
          this.mapComponent.showRoute(route);
        },
         100)
      }
    },
      100);
  }

  openChat() {
    this.matDialog.open(ChatDialogComponent, {
      data: {
        messages: this.messages,
        receiverId: 1
      }
    });
  }

  initializeWebSocketConnection() {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);

    this.stompClient.connect({}, () => {
      this.openSocket()
    });
  }

  openSocket() {
    this.stompClient.subscribe(`/socket-driver-movement/to-ride/${this.ride.id}`, (notification: { body: string; }) => {
      this.handleResult(notification);
    });
  }

  handleResult(notification: { body: string; }) {
    const information = JSON.parse(notification.body);
    const newLocation: Location = new Location(
      information.latitude,
      information.longitude,
      ""
    );
    this.mapComponent.updateMarkerLocation(this.currentLocation, newLocation);
    this.currentLocation = newLocation;
  }

  sendPanic() {
    this.panicErrorMessage = "";
    this.rideService.panicProcedure(this.ride.id, { reason: this.panicText }).subscribe({
      next: (ride: Ride) => {
        // TODO: Decide whether to end the ride or continue 
        this.closePanicReasonTextArea();
        this.matDialog.open(DialogComponent, { 
          data: {
            header: "Panic!",
            body: "Panic successfully sent"
        }})
        console.log(ride);
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          this.panicErrorMessage = error.error.message;
        }
      }
    })
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

  reportDriver() {
    this.reportErrorMessage = "";
    this.userService.sendNote(this.ride.driver.id, { message: this.reportText }).subscribe({
      next: (note: Note) => {
        // TODO: Decide whether to end the ride or continue 
        this.closeReportTextArea();
        this.matDialog.open(DialogComponent, { 
          data: {
            header: "Report!",
            body: "Report successfully sent"
        }})
        this.stompClient.send("/socket-subscriber/send/note", {}, JSON.stringify(note));
        console.log(note);
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          this.reportErrorMessage = error.error.message;
        }
      }
    })
  }

  openReportTextArea() {
    this.renderer.setStyle(
      this.reportForm.nativeElement,
      'display',
      'block'
    )
  }

  closeReportTextArea() {
    this.renderer.setStyle(
      this.reportForm.nativeElement,
      'display',
      'none'
    )
  }

}
