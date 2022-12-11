import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Document } from '../model/document.model';
import { Driver } from '../model/driver.model';
import { Reviews } from '../model/reviews.model';
import { Vehicle } from '../model/vehicle.model';
import { ReviewService } from './review.service';
import { VehicleService } from './vehicle.service';

const API_URL: string = 'http://localhost:8081/';

@Injectable({
  providedIn: 'root',
})
export class DriverService {
  constructor(private http: HttpClient, private reviewService: ReviewService) {}

  public getDriver(driverId: number): Observable<Driver> {
    return this.http.get<Driver>(API_URL + 'api/driver/' + driverId);
  }

  public getVehicle(driverId: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(API_URL + `api/driver/${driverId}/vehicle`);
  }

  public getDocuments(driverId: number): Observable<Document[]> {
    return this.http.get<Document[]>(
      API_URL + `api/driver/${driverId}/documents`
    );
  }

  public async getAvgDriverRating(driverId: number): Promise<number> {
    let sum = 0;

    let reviews = await this.reviewService
      .getDriverReviews(driverId)
      .toPromise();

    if (reviews != undefined) {
      if (reviews.results.length > 0) {
        reviews.results.forEach((review) => {
          sum = sum + review.rating;
        });
        sum = sum / reviews.totalCount;
      }
    }
    return sum;
  }

  public async getAvgVehicleRating(driverId: number): Promise<number> {
    let sum = 0;

    let vehicle = await this.getVehicle(driverId).toPromise();
    if (vehicle == undefined) throw Error('Vehicle not found');

    let reviews = await this.reviewService
      .getVehicleReviews(vehicle.id)
      .toPromise();
    if (reviews == undefined) throw Error('Reviews not found');

    if (reviews.results.length > 0) {
      reviews.results.forEach((review) => {
        sum = sum + review.rating;
      });
      sum = sum / reviews.totalCount;
    }
    return sum;
  }
}
