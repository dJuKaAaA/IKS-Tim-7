import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ride } from '../model/ride.model';
import { Rides } from '../model/rides.model';
import { environment } from 'src/environment/environment';
import { Rejection } from '../model/rejection.model';
import { RideRequest } from '../model/ride-request.model';
import { RideAddDriver } from '../model/ride-add-driver';
import { Panic } from '../model/panic';

@Injectable({
  providedIn: 'root',
})
export class RideService {
  constructor(private http: HttpClient) {}

  public getRides(userId: number): Observable<Rides> {
    return this.http.get<Rides>(
      environment.localhostApi + `user/${userId}/ride`
    );
  }

  public getRide(rideId: number): Observable<Ride> {
    return this.http.get<Ride>(environment.localhostApi + `ride/${rideId}`);
  }

  public getDriversActiveRide(driverId: number): Observable<Ride> {
    return this.http.get<Ride>(
      environment.localhostApi + `ride/driver/${driverId}/active`
    );
  }

  public rejectRide(id: number): Observable<Ride> {
    return this.http.put<Ride>(environment.localhostApi + `ride/${id}/withdraw`, {});
  }

  public cancelRide(id: number, reason: Rejection) {  // TODO: Replace after iss assistents make up their minds on the contents of these dtos
    return this.http.put(environment.localhostApi + `ride/${id}/cancel`, reason);
  }

  public acceptRide(id: number): Observable<Ride> {
    return this.http.put<Ride>(environment.localhostApi + `ride/${id}/accept`, {});
  }

  public startRide(id: number) {
    return this.http.put(environment.localhostApi + `ride/${id}/start`, {});
  }

  public finishRide(id: number) {
    return this.http.put(environment.localhostApi + `ride/${id}/end`, {});
  }

  public createRide(rideRequest: RideRequest): Observable<Ride> {
    return this.http.post<Ride>(environment.localhostApi + `ride`, rideRequest);
  }

  public panicProcedure(id: number, panicDetails: { reason: string }): Observable<Ride> {
    return this.http.put<Ride>(environment.localhostApi + `ride/${id}/panic`, panicDetails);
  }
}
