import { Component, OnInit } from '@angular/core';
import { Route } from './../../../model/route.model';
import { Rides } from 'src/app/model/rides.model';
import { RideService } from 'src/app/services/ride.service';
import { Ride } from 'src/app/model/ride.model';
import { ReviewService } from 'src/app/services/review.service';
import { RideReview } from 'src/app/model/ride-review.model';
import { Review } from 'src/app/model/review.model';
import { Router } from '@angular/router';
import { Passenger } from 'src/app/model/passenger.model';
import { Driver } from 'src/app/model/driver.model';
import { DateTimeService } from 'src/app/services/date-time.service';
import { AuthService } from 'src/app/services/auth.service';
import { DriverService } from 'src/app/services/driver.service';
import { PassengerService } from 'src/app/services/passenger.service';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';

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
  public ridesObject: Rides = {} as Rides;
  public rides: Array<Ride> = [];

  public rides$: Observable<Array<Ride>>;
  public refreshRides$ = new BehaviorSubject<boolean>(true);

  public currentDisplayedRide: Ride;
  public rideReviews: RideReview[] = [];
  public avgVehicleReviewRating: any = {};
  public avgDriverReviewRating: any = {};

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
    private dateTimeService: DateTimeService,
    private authService: AuthService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.ridesObject.totalCount = 0;
    this.ridesObject.results = [];
    const userId = this.authService.getId();

    if (this.authService.getRole() == 'ROLE_ADMIN') {
      await this.rideService
        .getAllRides()
        .toPromise()
        .then((data) => {
          if (data != undefined) {
            this.ridesObject = data;
            this.rides = this.ridesObject.results.filter((ride) => {
              if (ride.status === 'FINISHED' || ride.status === 'REJECTED') {
                return true;
              }
              return false;
            });

            this.rides$ = this.refreshRides$.pipe(
              switchMap((_) => of(this.rides))
            );
          }
        });
    } else {
      await this.rideService
        .getRides(userId)
        .toPromise()
        .then((data) => {
          if (data != undefined) {
            this.ridesObject = data;
            this.rides = this.ridesObject.results.filter((ride) => {
              if (ride.status === 'FINISHED' || ride.status === 'REJECTED') {
                return true;
              }
              return false;
            });

            this.rides$ = this.refreshRides$.pipe(
              switchMap((_) => of(this.rides))
            );
          }
        });
    }

    this.calculateReviews();
  }

  private calculateReviews() {
    this.avgVehicleReviewRating = [];
    this.avgDriverReviewRating = [];
    this.ridesObject.results.forEach((ride) => {
      this.reviewService.getReviews(ride.id).subscribe((data) => {
        this.rideReviews = data;

        let vehicleReviews: Review[] = [];
        let driverReviews: Review[] = [];
        this.rideReviews.forEach((review) => {
          vehicleReviews.push(review.vehicleReview);
          driverReviews.push(review.driverReview);
        });

        this.avgVehicleReviewRating[`${ride.id}`] = Math.round(this.getAvgRatingForReview(vehicleReviews))
        this.avgDriverReviewRating[`${ride.id}`] = Math.round(this.getAvgRatingForReview(driverReviews))
      });
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

    this.destinationDate = '';
    this.destinationTime = '';
    this.travelDuration = '';

    if (ride.endTime != null) {
      this.destinationDate = this.dateTimeService.getDate(
        this.dateTimeService.toDate(ride.endTime)
      );
      this.destinationTime = this.dateTimeService.getTime(
        this.dateTimeService.toDate(ride.startTime)
      );
      let [hours, minutes, seconds]: number[] =
        this.dateTimeService.getDiffDateTime(
          this.dateTimeService.toDate(ride.endTime),
          this.dateTimeService.toDate(ride.startTime)
        );
      this.travelDuration = `${hours}h ${minutes}m ${seconds}s`;
    }

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
    if (this.authService.getRole() === 'ROLE_DRIVER')
      this.router.navigate(['/driver-ride-history-details']);
    else if (this.authService.getRole() === 'ROLE_PASSENGER')
      this.router.navigate(['passenger-ride-history-details']);
    else if (this.authService.getRole() === 'ROLE_ADMIN') {
      this.router.navigate(['admin-ride-history-details'])
    }
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
    this.rides.sort((a, b) => (a.startTime > b.startTime ? 1 : -1));
    this.calculateReviews();
    this.refreshRides$.next(true);
  }

  private descSortByStartDate() {
    this.rides.sort((a, b) => (a.startTime > b.startTime ? -1 : 1));
    this.calculateReviews();
    this.refreshRides$.next(true);
  }

  private ascSortByEndDate() {
    this.rides.sort((a, b) => (a.endTime > b.endTime ? 1 : -1));
    this.calculateReviews();
    this.refreshRides$.next(true);
  }

  private descSortByEndDate() {
    this.rides.sort((a, b) => (a.endTime > b.endTime ? -1 : 1));
    this.calculateReviews();
    this.refreshRides$.next(true);
  }

  private ascSortByRoutes() {
    this.rides.sort((a, b) =>
      a.locations.length > b.locations.length ? 1 : -1
    );
    this.calculateReviews();
    this.refreshRides$.next(true);
  }

  private descSortByRoutes() {
    this.rides.sort((a, b) =>
      a.locations.length > b.locations.length ? -1 : 1
    );
    this.calculateReviews();
    this.refreshRides$.next(true);
  }
}
