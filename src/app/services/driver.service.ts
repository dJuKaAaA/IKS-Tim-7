import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Document, POSTDocument } from '../model/document.model';
import { DriverListDTO } from '../model/driver-list-dto';
import { Driver, NoIdDriver } from '../model/driver.model';
import { Vehicle } from '../model/vehicle.model';
import { ReviewService } from './review.service';
import { environment } from 'src/environment/environment';
import { Ride } from '../model/ride.model';
import { DriverProfileChangeRequest } from '../model/driver-profile-change-request.model';
import { ActivityDto } from '../model/activity-dto.model';
import { RideService } from './ride.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class DriverService {

  private hasActiveRide$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isActive$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  getHasActiveRide(): boolean {
    return this.hasActiveRide$.getValue();
  }

  setHasActiveRide(hasActive: boolean) {
    this.hasActiveRide$.next(hasActive);
  }

  getIsActive(): boolean {
    return this.isActive$.getValue();
  }

  setIsActive(isActive: boolean) {
    this.isActive$.next(isActive);
  }

  constructor(private http: HttpClient, private reviewService: ReviewService, private rideService: RideService, private authService: AuthService) {
    this.rideService.getDriversActiveRide(this.authService.getId()).subscribe({
      next: (ride: Ride) => {
        this.setHasActiveRide(true);
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          this.setHasActiveRide(false);
        }
      }
    })
    this.fetchActivity(this.authService.getId()).subscribe({
      next: (activity: ActivityDto) => {
        this.setIsActive(activity.isActive);
      }
    }) 
  }

  public getDrivers(): Observable<DriverListDTO> {
    return this.http.get<DriverListDTO>(environment.localhostApi + 'driver');
  }

  public getDriver(driverId: number): Observable<Driver> {
    return this.http.get<Driver>(
      environment.localhostApi + 'driver/' + driverId
    );
  }

  public getVehicle(driverId: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(
      environment.localhostApi + `driver/${driverId}/vehicle`
    );
  }

  public getDocuments(driverId: number): Observable<Document[]> {
    return this.http.get<Document[]>(
      environment.localhostApi + `driver/${driverId}/documents`
    );
  }

  public createDocument(driverId: number, document: POSTDocument) {
    return this.http.post<Document>(
      environment.localhostApi + `driver/${driverId}/documents`,
      document
    );
  }

  public deleteDocument(documentId: Number) {
    return this.http.delete(
      environment.localhostApi + `driver/document/${documentId}`
    );
  }

  public updateDriver(driverId: Number, driver: NoIdDriver) {
    return this.http.put(
      environment.localhostApi + `driver/${driverId}`,
      driver
    );
  }

  public saveDriverProfileChangeRequest(
    driverId: number,
    request: DriverProfileChangeRequest
  ): Observable<DriverProfileChangeRequest> {
    return this.http.post<DriverProfileChangeRequest>(
      environment.localhostApi + `driver/request/${driverId}`,
      request
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

  public saveDriver(driver: Driver) {
    return this.http.post<Driver>(environment.localhostApi + 'driver', driver);
  }

  public fetchActivity(id: number): Observable<ActivityDto> {
    return this.http.get<ActivityDto>(environment.localhostApi + `driver/${id}/activity`);
  }

  public changeActivity(id: number, activity: ActivityDto) {
    return this.http.put(environment.localhostApi + `driver/${id}/activity`, activity);
  }

  public getRides(id: number) {
    return this.http.get(environment.localhostApi + `driver/${id}/ride`);
  }

  public getScheduledRides(id: number): Observable<Array<Ride>> {
    return this.http.get<Array<Ride>>(environment.localhostApi + `driver/${id}/rides/scheduled`);
  }

}
