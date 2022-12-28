import { Component, OnInit } from '@angular/core';
import { Route } from './../../../model/route.model';
import { Rides } from 'src/app/model/rides.model';
import { RideService } from 'src/app/services/ride.service';
import { Ride } from 'src/app/model/ride.model';
import { DateTime } from 'src/app/date-time';
import { ReviewService } from 'src/app/services/review.service';
import { RideReview } from 'src/app/model/ride-review.model';
import { Review } from 'src/app/model/review.model';
import { Router } from '@angular/router';
import { Passenger } from 'src/app/model/passenger.model';
import { Driver } from 'src/app/model/driver.model';

export interface TableElement {
  route: string;
  departureLocation: String;
  destinationLocation: String;
}

@Component({
  selector: 'app-ride-history-information',
  templateUrl: './ride-history-information.component.html',
  styleUrls: ['./ride-history-information.component.css'],
})
export class RideHistoryInformationComponent implements OnInit {
  public user: Passenger | Driver = new Passenger();
  public ridesObject: Rides = {} as Rides;
  public currentDisplayedRide: Ride;
  public rideReviews: RideReview[] = [];
  public avgVehicleReviewRating: number = 0;
  public avgDriverReviewRating: number = 0;

  public sortCriteria: String = '';
  public destinationDate: String = '';
  public destinationTime: String = '';
  public travelDuration: String = '';
  public price: String = '';

  public displayedColumns: string[] = [
    'route',
    'departureLocation',
    'destinationLocation',
  ];
  public dataSource: TableElement[] = [];

  constructor(
    private rideService: RideService,
    private reviewService: ReviewService,
    private router: Router
  ) {}

  ngOnInit() {
    this.rideService.getRides(1).subscribe((data) => (this.ridesObject = data));

    this.reviewService.getReviews(1).subscribe((data) => {
      this.rideReviews = data;

      let vehicleReviews: Review[] = [];
      let driverReviews: Review[] = [];
      this.rideReviews.forEach((review) => {
        vehicleReviews.push(review.vehicleReview);
        driverReviews.push(review.driverReview);
      });

      this.avgVehicleReviewRating = Math.round(
        this.getAvgRatingForReview(vehicleReviews)
      );
      this.avgDriverReviewRating = Math.round(
        this.getAvgRatingForReview(driverReviews)
      );
    });
  }

  displayRoutesInTable(ride: Ride) {
    this.currentDisplayedRide = ride;
    this.dataSource = [];
    ride.locations.forEach((route, index) => {
      this.dataSource.push({
        route: `Route ${index + 1}`,
        departureLocation: route.departure.address,
        destinationLocation: route.destination.address,
      });
    });

    let dateTime: DateTime = new DateTime();
    console.log(ride.endTime);
    this.destinationDate = dateTime.getDate(ride.endTime);
    this.destinationTime = dateTime.getTime(ride.startTime);

    let [hours, minutes, seconds]: number[] = dateTime.getDiffDateTime(
      ride.endTime,
      ride.startTime
    );
    this.travelDuration = `${hours}h ${minutes}m ${seconds}s`;

    this.price = String(ride.totalCost);
  }

  public onChangeSortCriteria(): void {
    if (this.sortCriteria == 'ascStartDate') {
      this.ascSortByStartDate();
    } else if (this.sortCriteria === 'descStartDate')
      this.descSortByStartDate();
    else if (this.sortCriteria === 'ascEndDate') this.ascSortByEndDate();
    else if (this.sortCriteria === 'descEndDate') this.descSortByEndDate();
    else if (this.sortCriteria === 'ascRoute') this.ascSortByRoutes();
    else if (this.sortCriteria === 'descRoute') this.descSortByRoutes();
  }

  public displayRideDetails() {
    sessionStorage.setItem(
      'rideForDisplayDetails',
      String(this.currentDisplayedRide.id)
    );
    if (this.user instanceof Driver)
      this.router.navigate(['/driver-ride-history-details']);
    else if (this.user instanceof Passenger)
      this.router.navigate(['passenger-ride-history-details']);
  }

  private getAvgRatingForReview(reviews: Review[]): number {
    let sum = 0;
    if (reviews.length > 0) {
      for (let review of reviews) {
        sum = sum + review.rating;
      }
      return sum / reviews.length;
    }
    return sum;
  }

  private ascSortByStartDate() {
    this.ridesObject.results.sort((a, b) =>
      a.startTime > b.startTime ? 1 : -1
    );
  }

  private descSortByStartDate() {
    this.ridesObject.results.sort((a, b) =>
      a.startTime > b.startTime ? -1 : 1
    );
  }

  private ascSortByEndDate() {
    this.ridesObject.results.sort((a, b) => (a.endTime > b.endTime ? 1 : -1));
  }

  private descSortByEndDate() {
    this.ridesObject.results.sort((a, b) => (a.endTime > b.endTime ? -1 : 1));
  }

  private ascSortByRoutes() {
    this.ridesObject.results.sort((a, b) =>
      a.locations.length > b.locations.length ? 1 : -1
    );
  }

  private descSortByRoutes() {
    this.ridesObject.results.sort((a, b) =>
      a.locations.length > b.locations.length ? -1 : 1
    );
  }
}
