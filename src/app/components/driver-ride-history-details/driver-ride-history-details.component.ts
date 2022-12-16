import {
  AfterContentInit,
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DateTime } from 'src/app/DateTIme';
import { Driver } from 'src/app/model/driver.model';
import { Passenger } from 'src/app/model/passenger.model';
import { Review } from 'src/app/model/review.model';
import { Ride } from 'src/app/model/ride.model';
import { Vehicle } from 'src/app/model/vehicle.model';
import { DriverService } from 'src/app/services/driver.service';
import { PassengerService } from 'src/app/services/passenger.service';
import { ReviewService } from 'src/app/services/review.service';
import { RideService } from 'src/app/services/ride.service';
import { TomTomGeolocationService } from 'src/app/services/tom-tom-geolocation.service';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-driver-ride-history-details',
  templateUrl: './driver-ride-history-details.component.html',
  styleUrls: ['./driver-ride-history-details.component.css'],
})
<<<<<<< HEAD
export class DriverRideHistoryDetailsComponent implements OnInit, AfterViewInit {
=======
export class DriverRideHistoryDetailsComponent
  implements AfterViewInit, OnInit
{
>>>>>>> 62f593e6952cea1edc84df96448ed96b1a5b0d6d
  @ViewChild(MapComponent) mapComponent: MapComponent;

  public ride: Ride = {} as Ride;
  public driver: Driver = {} as Driver;
  public vehicle: Vehicle = {} as Vehicle;
  public driverReviews: Review[];
  public vehicleReviews: Review[];
  public passengers: Passenger[] = [];

  public departure: string;
  public destination: string;
  public departureDate: string;
  public departureTime: string;
  public duration: string;
  public distance: number = 0;

  constructor(
    private rideService: RideService,
    private driverService: DriverService,
    private reviewService: ReviewService,
    private passengerService: PassengerService,
    private tomTomService: TomTomGeolocationService
  ) {}
  ngOnInit(): void {}

<<<<<<< HEAD
  ngAfterViewInit(): void {
    this.mapComponent.loadMap();
  }

  async ngOnInit() {
=======
  async ngAfterViewInit() {
>>>>>>> 62f593e6952cea1edc84df96448ed96b1a5b0d6d
    await this.rideService
      .getRide(1)
      .toPromise()
      .then((data) => {
        this.ride = data ?? ({} as Ride);
      });

    await this.driverService
      .getVehicle(this.ride.driver.id)
      .toPromise()
      .then((data) => (this.vehicle = data ?? ({} as Vehicle)));

    this.ride.passengers.forEach((simplePassenger) => {
      this.passengerService
        .getPassenger(simplePassenger.id)
        .subscribe((passenger) => this.passengers.push(passenger));
    });
    this.driverService
      .getDriver(this.ride.driver.id)
      .subscribe((data) => (this.driver = data));

    this.reviewService
      .getDriverReviews(this.ride.driver.id)
      .subscribe((data) => (this.driverReviews = data.results));

    this.reviewService
      .getVehicleReviews(this.vehicle.id)
      .subscribe((data) => (this.vehicleReviews = data.results));

    this.departure = this.ride.locations[0].departure.address;
    this.destination =
      this.ride.locations[this.ride.locations.length - 1].destination.address;

    // this.departureDate = this.ride.startTime.split(' ')[0];
    // this.departureTime = this.ride.startTime.split(' ')[1];

<<<<<<< HEAD
    let dateTimeConverter: DateTime = new DateTime();
    let startDate: Date = dateTimeConverter.toDate(this.ride.startTime);
    let endDate: Date = dateTimeConverter.toDate(this.ride.endTime);
    let [_, hours, minutes, seconds]: number[] =
      dateTimeConverter.getDiffDateTime(endDate, startDate);
    this.duration = `${hours}h ${minutes}m ${seconds}s`;
    this.mapComponent.loadMap();
  }
=======
    // let dateTimeConverter: DateTime = new DateTime();
    // let startDate: Date = dateTimeConverter.toDate(this.ride.startTime);
    // let endDate: Date = dateTimeConverter.toDate(this.ride.endTime);
    // let [_, hours, minutes, seconds]: number[] =
    //   dateTimeConverter.getDiffDateTime(endDate, startDate);
    // this.duration = `${hours}h ${minutes}m ${seconds}s`;
>>>>>>> 62f593e6952cea1edc84df96448ed96b1a5b0d6d

    this.ride.locations.forEach((route) => {
      this.mapComponent.showRouteFromAddresses(
        route.departure.address,
        route.destination.address
      );

      this.tomTomService
        .getRoute(
          route.departure.latitude,
          route.departure.longitude,
          route.destination.latitude,
          route.destination.longitude
        )
        .subscribe(
          (response) =>
            (this.distance =
              this.distance + response.routes[0].summary.lengthInMeters)
        );
    });
    this.mapComponent.loadMap();
  }
}
