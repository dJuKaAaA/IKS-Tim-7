import { Component, OnInit, ViewChild } from '@angular/core';
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

  constructor(
    private matDialog: MatDialog, 
    private authService: AuthService, 
    private userService: UserService, 
    private activatedRoute: ActivatedRoute,
    private rideService: RideService,
    private dateTimeService: DateTimeService) {}

  ngOnInit(): void {
    this.userService.fetchMessages(3).subscribe({  // TODO: Change to this.authService.getId()
      next: (response: PaginatedResponse<Message>) => {
        this.messages = response.results;
      }
    })
    this.initializeWebSocketConnection();
  }

  ngAfterViewInit(): void {
    this.mapComponent.loadMap();
    const idUrlParam: any = this.activatedRoute.snapshot.paramMap.get("id");
    const id = (idUrlParam == null) ? -1 : +idUrlParam;
    this.rideService.getRide(id).subscribe({
      next: (ride: Ride) => {
        this.ride = ride;
        this.rideDate = this.dateTimeService.toDate(this.ride.startTime);
        this.currentLocation = this.ride.locations[0].departure;
        this.mapComponent.showMarker(this.currentLocation, 'src/assets/icons8-taxi-96.png');
        for (let route of this.ride.locations) {
          this.mapComponent.showRoute(route);
        }
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
    this.stompClient.subscribe(`/socket-driver-movement/${this.ride.id}`, (currentLocation: { body: string; }) => {
      this.handleResult(currentLocation);
    });
  }

  handleResult(currentLocation: { body: string; }) {
    const location = JSON.parse(currentLocation.body);
    const newLocation: Location = new Location(
      location.latitude,
      location.longitude,
      ""
    );
    this.mapComponent.updateMarkerLocation(this.currentLocation, newLocation);
    this.currentLocation = newLocation;
  }

}
