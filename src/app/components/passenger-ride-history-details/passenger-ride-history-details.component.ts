import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Driver } from 'src/app/model/driver.model';
import { Review } from 'src/app/model/review.model';
import { RideRequest } from 'src/app/model/ride-request.model';
import { Ride } from 'src/app/model/ride.model';
import { Vehicle } from 'src/app/model/vehicle.model';
import { DateTimeService } from 'src/app/services/date-time.service';
import { DriverService } from 'src/app/services/driver.service';
import { ReviewService } from 'src/app/services/review.service';
import { RideService } from 'src/app/services/ride.service';
import { TomTomGeolocationService } from 'src/app/services/tom-tom-geolocation.service';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-passenger-ride-history-details',
  templateUrl: './passenger-ride-history-details.component.html',
  styleUrls: ['./passenger-ride-history-details.component.css'],
})
export class PassengerRideHistoryDetailsComponent
  implements OnInit, AfterViewInit
{
  @ViewChild(MapComponent) mapComponent: MapComponent;

  public ride: Ride = {} as Ride;
  public driver: Driver = {} as Driver;
  public vehicle: Vehicle = {} as Vehicle;
  public driverReviews: Review[];
  public vehicleReviews: Review[];

  public departure: string;
  public destination: string;
  public departureDate: string;
  public departureTime: string;
  public duration: string;
  public distance: number = 0;
  public price: number = 0;

  constructor(
    private rideService: RideService,
    private driverService: DriverService,
    private reviewService: ReviewService,
    private tomTomService: TomTomGeolocationService,
    private dateTimeService: DateTimeService
  ) {}

  ngOnInit(): void {}
  async ngAfterViewInit() {
    await this.rideService
      .getRide(Number(sessionStorage.getItem('rideForDisplayDetails')))
      .toPromise()
      .then((data) => (this.ride = data ?? ({} as Ride)));

    await this.driverService
      .getVehicle(this.ride.driver.id)
      .toPromise()
      .then((data) => (this.vehicle = data ?? ({} as Vehicle)));

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

    if (this.ride.endTime != null) {
      this.departureDate = this.ride.startTime.toString().split(' ')[0];
      this.departureTime = this.ride.startTime.toString().split(' ')[1];
      let [hours, minutes, seconds]: number[] =
        this.dateTimeService.getDiffDateTime(
          this.dateTimeService.toDate(this.ride.endTime),
          this.dateTimeService.toDate(this.ride.startTime)
        );
      this.duration = `${hours}h ${minutes}m ${seconds}s`;
    }

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

  public orderRide(): void {
    let rideRequest: RideRequest = {} as RideRequest;
    rideRequest.babyTransport = this.ride.babyTransport;
    rideRequest.locations = this.ride.locations;
    rideRequest.passengers = this.ride.passengers;
    rideRequest.petTransport = this.ride.petTransport;
    rideRequest.scheduledTime = this.ride.startTime;
    rideRequest.vehicleType = this.ride.vehicleType;

    this.rideService.createRide(rideRequest).subscribe(
      (_) => {
        alert('You have successfully order a ride!');
      },
      (err) => {
        alert(err.error.message);
      }
    );
  }
}
