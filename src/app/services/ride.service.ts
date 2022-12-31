import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ride } from '../model/ride.model';
import { Rides } from '../model/rides.model';
import { environment } from 'src/environment/environment';
import { Rejection } from '../model/rejection.model';

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

  public rejectRide(id: number) {
    return this.http.put(environment.localhostApi + `ride/${id}/withdraw`, {});
  }

  public cancelRide(id: number, reason: Rejection) {  // TODO: Replace after iss assistents make up their minds on the contents of these dtos
    return this.http.put(environment.localhostApi + `ride/${id}/cancel`, reason);
  }

  public acceptRide(id: number) {
    return this.http.put(environment.localhostApi + `ride/${id}/accept`, {});
  }

  public startRide(id: number) {
    return this.http.put(environment.localhostApi + `ride/${id}/start`, {});
  }
}
