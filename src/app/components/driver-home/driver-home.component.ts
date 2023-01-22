import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import { Vehicle } from 'src/app/model/vehicle.model';
import { Location } from 'src/app/model/location.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-driver-home',
  templateUrl: './driver-home.component.html',
  styleUrls: ['./driver-home.component.css']
})
export class DriverHomeComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(MapComponent) mapComponent: MapComponent;

  private stompClient: any;

  cardCount: number = 5;
  scheduledRides: Array<Ride> = [];
  location: Location;
  activeRideId: number = NaN;
  driverLocation: Location = new Location(NaN, NaN, "");

  simulationIntervalId$: BehaviorSubject<any> = new BehaviorSubject<any>(undefined);

  constructor(
    private router: Router, 
    private driverService: DriverService,
    private authService: AuthService,
    private rideService: RideService) { }

  ngOnDestroy(): void {
    this.stompClient.disconnect();
  }

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
          this.activeRideId = NaN;
        }
      }
    })
    this.initializeWebSocketConnection();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.mapComponent.loadMap();
      this.driverService.getVehicle(this.authService.getId()).subscribe({
        next: (vehicle: Vehicle) => {
          this.driverLocation = vehicle.currentLocation;
          this.mapComponent.showMarker(this.driverLocation, environment.taxiMarker);
        }, error: (error) => {
          if (error instanceof HttpErrorResponse) {}
        }
      })
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
    let ws = new SockJS(environment.socketUrl);
    this.stompClient = Stomp.over(ws);

    console.log("Odje se otvara socket konekcija linija 91 u driver-home-component.ts")
    const headers = { "Authorization": `Bearer ${this.authService.getToken()}` }
    this.stompClient.connect(headers, () => {
      this.openSocket()
    });
  }

  openSocket() {
    this.stompClient.subscribe(`/socket-scheduled-ride/to-driver/${this.authService.getId()}`,
     (rideData: { body: string; }) => {
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

  hasActiveRide(): boolean {
    return this.driverService.getHasActiveRide();
  }

  updateDriverLocation(newDriverLocation: Location) {
    this.driverLocation = newDriverLocation;
  }

}
