import { HttpErrorResponse } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Driver } from 'src/app/model/driver.model';
import { Passenger } from 'src/app/model/passenger.model';
import { Review } from 'src/app/model/review.model';
import { RideReview } from 'src/app/model/ride-review.model';
import { Ride } from 'src/app/model/ride.model';
import { User } from 'src/app/model/user';
import { Vehicle } from 'src/app/model/vehicle.model';
import { DateTimeService } from 'src/app/services/date-time.service';
import { DriverService } from 'src/app/services/driver.service';
import { PassengerService } from 'src/app/services/passenger.service';
import { ReviewService } from 'src/app/services/review.service';
import { RideService } from 'src/app/services/ride.service';
import { TomTomGeolocationService } from 'src/app/services/tom-tom-geolocation.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-admin-ride-history-details',
  templateUrl: './admin-ride-history-details.component.html',
  styleUrls: ['./admin-ride-history-details.component.css']
})
export class AdminRideHistoryDetailsComponent {
  @ViewChild(MapComponent) mapComponent: MapComponent;

  public ride: Ride = {} as Ride;
  public driver: Driver = {} as Driver;
  public vehicle: Vehicle = {} as Vehicle;
  public driverReviews: Review[] = [];
  public vehicleReviews: Review[] = [];
  public users: User[] = [];

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
    private passengerService: PassengerService,
    private dateTimeService: DateTimeService,
    private matDialog: MatDialog
  ) { }

  async ngAfterViewInit() {
    await this.rideService
      .getRide(Number(sessionStorage.getItem('rideForDisplayDetails')))
      .toPromise()
      .then((data) => {
        this.ride = data ?? ({} as Ride);
        this.price = this.ride.totalCost;
      });

    await this.driverService
      .getVehicle(this.ride.driver.id)
      .toPromise()
      .then((data) => (this.vehicle = data ?? ({} as Vehicle)));

    this.ride.passengers.forEach((simplePassenger) => {
      this.passengerService
        .getPassenger(simplePassenger.id)
        .subscribe((passenger) => this.users.push(passenger as User));
    });

    this.driverService
      .getDriver(this.ride.driver.id)
      .subscribe((data) => { this.driver = data; this.users.push(this.driver)} );

    this.reviewService.getReviews(this.ride.id).subscribe({
      next: (rideReviews: Array<RideReview>) => {
        for (let review of rideReviews) {
          this.driverReviews.push(review.driverReview);
          this.vehicleReviews.push(review.vehicleReview);
        }

      }, error: (error) => {
        if (error instanceof HttpErrorResponse) {
          this.matDialog.open(DialogComponent, {
            data: {
              header: "Error!",
              body: error.error.message
            }
          });
        }
      }
    })

    for (let route of this.ride.locations) {
      this.distance += route.distanceInMeters;
    }

    this.departure = this.ride.locations[0].departure.address;
    this.destination =
      this.ride.locations[this.ride.locations.length - 1].destination.address;

    this.departureDate = this.ride.startTime.split(' ')[0];
    this.departureTime = this.ride.startTime.split(' ')[1];

    if (this.ride.endTime != null) {
      let [hours, minutes, seconds]: number[] =
        this.dateTimeService.getDiffDateTime(
          this.dateTimeService.toDate(this.ride.endTime),
          this.dateTimeService.toDate(this.ride.startTime)
        );
      this.duration = `${hours}h ${minutes}m ${seconds}s`;
    }
    
    setTimeout(() => {
      this.mapComponent.loadMap();
      this.ride.locations.forEach(route => {
        this.mapComponent.showRoute(route);
      })
      this.mapComponent.focusOnPoint(this.ride.locations[0].departure);
    }, 100);
  }
}
