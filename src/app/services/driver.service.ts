import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Document } from '../model/document.model';
import { DriverListDTO } from '../model/driver-list-dto';
import { Driver } from '../model/driver.model';
import { Vehicle } from '../model/vehicle.model';
import { ReviewService } from './review.service';
import { environment } from 'src/environment/environment';
import { Ride } from '../model/ride.model';

@Injectable({
  providedIn: 'root',
})
export class DriverService {
  constructor(private http: HttpClient, private reviewService: ReviewService) {}

  public getDrivers(): Observable<DriverListDTO> {
    return this.http.get<DriverListDTO>(environment.localhostApi + 'driver');
  }

  public getDriver(driverId: number): Observable<Driver> {
    return this.http.get<Driver>(environment.localhostApi + 'driver/' + driverId);
  }

  public getVehicle(driverId: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(environment.localhostApi + `driver/${driverId}/vehicle`);
  }

  public getDocuments(driverId: number): Observable<Document[]> {
    return this.http.get<Document[]>(
      environment.localhostApi + `driver/${driverId}/documents`
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

  public saveDriver(driver : Driver){
    return this.http.post<Driver>(environment.localhostApi + "driver",driver);
  }

  public changeActivity(id: number) {
    return this.http.post<Driver>(environment.localhostApi + `driver/${id}/activity`, {});
  }

  public getRides(id: number) {
    return this.http.get(environment.localhostApi + `driver/${id}/ride`);
  }

  public getPendingRides(id: number): Observable<Array<Ride>> {
    return this.http.get<Array<Ride>>(environment.localhostApi + `driver/${id}/rides/pending`);
  }
}
