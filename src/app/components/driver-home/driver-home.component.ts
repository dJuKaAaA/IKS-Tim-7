import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, TitleStrategy } from '@angular/router';
import { Ride } from 'src/app/model/ride.model';
import { Route } from 'src/app/model/route.model';
import { DriverService } from 'src/app/services/driver.service';
import { MapComponent } from '../map/map.component';
import { AuthService } from 'src/app/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { RideService } from 'src/app/services/ride.service';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-driver-home',
  templateUrl: './driver-home.component.html',
  styleUrls: ['./driver-home.component.css']
})
export class DriverHomeComponent implements OnInit, AfterViewInit {

  @ViewChild(MapComponent) mapComponent: MapComponent;

  private serverUrl = environment.localhostApi + 'socket';
  private stompClient: any;

  cardCount: number = 5;
  scheduledRides: Array<Ride> = [];
  location: Location;
  activeRideId: number = -1;

  constructor(
    private router: Router, 
    private driverService: DriverService,
    private authService: AuthService,
    private rideService: RideService) { }

  ngOnInit(): void {
    // load ride data from RideService
    this.driverService.getScheduledRides(this.authService.getId()).subscribe((result: any) => {
      this.scheduledRides = result;
    });
    this.rideService.getDriversActiveRide(this.authService.getId()).subscribe({
      next: (ride: Ride) => {
        this.activeRideId = ride.id;
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          this.activeRideId = -1;
        }
      }
    })
    this.initializeWebSocketConnection();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.mapComponent.loadMap();
    },
      100)
  }

  removeRideFromDisplay(ride: Ride) {
    for (let location of ride.locations) {
      let route: Route = new Route(location.departure, location.destination, NaN, NaN);
      this.mapComponent.removeRoute(route);
    }
    this.scheduledRides = this.scheduledRides.filter((scheduled) => scheduled.id != ride.id);
  }

  accessCurrentRide() {
    this.router.navigate([`driver-current-ride/${this.activeRideId}`]);
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
        this.scheduledRides.push(ride);
      }
    }
  }

}
