import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, TitleStrategy } from '@angular/router';
import { Ride } from 'src/app/model/ride.model';
import { Route } from 'src/app/model/route.model';
import { DriverService } from 'src/app/services/driver.service';
import { MapComponent } from '../map/map.component';
import { AuthService } from 'src/app/services/auth.service';
import { NgxMaterialTimepickerHoursFace } from 'ngx-material-timepicker/src/app/material-timepicker/components/timepicker-hours-face/ngx-material-timepicker-hours-face';
import { DriverRideHistoryDetailsComponent } from '../driver-ride-history-details/driver-ride-history-details.component';

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

  constructor(private router: Router, private driverService: DriverService, private authService: AuthService) { }

  ngOnInit(): void {
    // load ride data from RideService
    this.driverService.getPendingRides(this.authService.getId()).subscribe((result: any) => {
      this.scheduledRides = result;
    });
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
