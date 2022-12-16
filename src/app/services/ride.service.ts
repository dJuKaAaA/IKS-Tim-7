import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ride } from '../model/ride.model';
import { Rides } from '../model/rides.model';

const API_URL: string = 'http://localhost:8081/';

@Injectable({
  providedIn: 'root',
})
export class RideService {
  constructor(private http: HttpClient) {}

  public getRides(userId: number): Observable<Rides> {
    return this.http.get<Rides>(API_URL + `api/user/${userId}/ride`);
  }

  public getRide(rideId: number): Observable<Ride> {
    return this.http.get<Ride>(API_URL + `api/ride/${rideId}`);
  }

  public getDriversActiveRide(driverId: number) : Observable<Ride>{
    return this.http.get<Ride>(API_URL + `api/ride/driver/${driverId}/active`)
  } 
}
