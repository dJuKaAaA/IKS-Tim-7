import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, TitleStrategy } from '@angular/router';
import { Ride } from 'src/app/model/ride.model';
import { Route } from 'src/app/model/route.model';
import { DriverService } from 'src/app/services/driver.service';
import { MapComponent } from '../map/map.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-driver-home',
  templateUrl: './driver-home.component.html',
  styleUrls: ['./driver-home.component.css']
})
export class DriverHomeComponent implements OnInit, AfterViewInit {

  @ViewChild(MapComponent) mapComponent: MapComponent;

  cardCount: number = 5;
  scheduledRides: Array<Ride> = [];
  location: Location;

  constructor(private router: Router, private driverService: DriverService, private authService: AuthService) {}

  ngOnInit(): void {
    // load ride data from RideService
    // but for now
    // making dummy data just for show
    for (let i = 0; i < this.cardCount; ++i) {
      let ride: Ride = {
        "id": i + 1,
        "startTime": new Date(2022, 11, 21, 20, 30),
        "endTime": new Date(2022, 11, 21, 21, 0),
        "totalCost": 1235,
        "driver": {
          "id": 123,
          "email": "user@example.com"
        },
        "passengers": [
          {
            "id": 123,
            "email": "user1@example.com"
          },
          {
            "id": 124,
            "email": "use2@example.com"
          },
          {
            "id": 125,
            "email": "user3@example.com"
          },
          {
            "id": 126,
            "email": "user4@example.com"
          },
          {
            "id": 127,
            "email": "user5@example.com"
          }
        ],
        "estimatedTimeInMinutes": 5,
        "vehicleType": "STANDARDNO",
        "babyTransport": true,
        "petTransport": true,
        "rejection": {
          "reason": "Ride is canceled due to previous problems with the passenger",
          "timeOfRejection": "2022-11-25T17:32:28Z"
        },
        "locations": [
          {
            "departure": {
              "address": "Katolicka Porta 4, Novi Sad, 21101, Srbija",
              "latitude": 45.25596,
              "longitude": 19.84578,
            },
            "destination": {
              "address": "Dunavski Park, Novi Sad, 21101, Srbija",
              "latitude": 45.25534,
              "longitude": 19.85144
            },
            "distanceInMeters": NaN,
          }
        ],
        "status": "PENDING"
      }
      this.scheduledRides.push(ride);
    }

    this.mapComponent.loadMap();
  }

  ngAfterViewInit(): void {
    this.mapComponent.loadMap();
  }

  removeRideFromDisplay(ride: Ride) {
    for (let location of ride.locations) {
      let route: Route = new Route(location.departure, location.destination, NaN, NaN);
      this.mapComponent.removeRoute(route);
    }
    this.scheduledRides = this.scheduledRides.filter((scheduled) => scheduled.id != ride.id);
  }

}
