import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Driver } from 'src/app/model/driver.model';
import { Review } from 'src/app/model/review.model';
import { RideRequest } from 'src/app/model/ride-request.model';
import { RideReview } from 'src/app/model/ride-review.model';
import { Ride } from 'src/app/model/ride.model';
import { Vehicle } from 'src/app/model/vehicle.model';
import { DateTimeService } from 'src/app/services/date-time.service';
import { DriverService } from 'src/app/services/driver.service';
import { ReviewService } from 'src/app/services/review.service';
import { RideService } from 'src/app/services/ride.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MapComponent } from '../map/map.component';
import { ScheduleTimeDialogComponent } from '../schedule-time-dialog/schedule-time-dialog.component';

@Component({
  selector: 'app-passenger-ride-history-details',
  templateUrl: './passenger-ride-history-details.component.html',
  styleUrls: ['./passenger-ride-history-details.component.css'],
})
export class PassengerRideHistoryDetailsComponent
  implements AfterViewInit
{
  @ViewChild(MapComponent) mapComponent: MapComponent;

  public ride: Ride = {} as Ride;
  public driver: Driver = {} as Driver;
  public vehicle: Vehicle = {} as Vehicle;
  public driverReviews: Review[] = [];
  public vehicleReviews: Review[] = [];

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
    private dateTimeService: DateTimeService,
    private matDialog: MatDialog
  ) {}

  async ngAfterViewInit() {
    await this.rideService
      .getRide(Number(sessionStorage.getItem('rideForDisplayDetails')))
      .toPromise()
      .then((data) => {
        this.ride = data ?? ({} as Ride);
        if (this.ride) this.price = this.ride.totalCost;
      });

    await this.driverService
      .getVehicle(this.ride.driver.id)
      .toPromise()
      .then((data) => (this.vehicle = data ?? ({} as Vehicle)));

    this.driverService
      .getDriver(this.ride.driver.id)
      .subscribe((data) => (this.driver = data));

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

    setTimeout(() => {
      this.mapComponent.loadMap();
      this.ride.locations.forEach(route => {
        this.mapComponent.showRoute(route);
      })
      this.mapComponent.focusOnPoint(this.ride.locations[0].departure);
    }, 100);
  }

  public orderRide(): void {
    let rideRequest: RideRequest = {} as RideRequest;
    rideRequest.babyTransport = this.ride.babyTransport;
    rideRequest.locations = this.ride.locations;
    rideRequest.passengers = this.ride.passengers;
    rideRequest.petTransport = this.ride.petTransport;
    rideRequest.scheduledTime = undefined;
    rideRequest.vehicleType = this.ride.vehicleType;

    this.matDialog.open(ScheduleTimeDialogComponent, {
        data: {
          rideRequest: rideRequest
        }
      });
    
  }
}
