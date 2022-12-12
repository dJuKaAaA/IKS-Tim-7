import { Component, OnInit, ViewChild } from '@angular/core';
import { Ride } from 'src/app/model/ride.model';
import { Route } from 'src/app/model/route.model';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-driver-home',
  templateUrl: './driver-home.component.html',
  styleUrls: ['./driver-home.component.css']
})
export class DriverHomeComponent implements OnInit {

  @ViewChild(MapComponent) mapComponent: MapComponent;

  cardCount: number = 10;
  routes: Array<Route> = [];
  scheduledRides: Array<Ride> = [];

  ngOnInit(): void {
    // load ride data from RideService
    // but for now
    // making dummy data just for show
    for (let i = 0; i < this.cardCount; ++i) {
      let ride: Ride = {
        "id": 123,
        "startTime": "2017-07-21T17:32:28Z",
        "endTime": "2017-07-21T17:45:14Z",
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
              "longitude": 19.84578
            },
            "destination": {
              "address": "Dunavski Park, Novi Sad, 21101, Srbija",
              "latitude": 45.25534,
              "longitude": 19.85144
            },
            "distanceInMeters": NaN
          }
        ],
        "status": "PENDING"
      }
      this.scheduledRides.push(ride);
    }

  }

  startRide(ride: Ride): void {

  }

  rejectRide(ride: Ride): void {

  }

  showRideRoutes(ride: Ride) {
    this.routes = [];
    this.mapComponent.clearMap();
    for (let route of ride.locations) {
      let r: Route = new Route(route.departure, route.destination, route.distanceInMeters); 
      this.routes.push(r);
      this.mapComponent.showRoute(r);
    }
    this.mapComponent.focusOnPoint(this.routes[0].departure);
  }

}
