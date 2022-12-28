import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ride } from '../model/ride.model';
import { Rides } from '../model/rides.model';
import { environment } from 'src/environment/environment';

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
}
