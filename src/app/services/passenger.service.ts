import { Injectable } from '@angular/core';
import { Passenger } from '../model/passenger.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environment/environment';
import { PassengerNarrowedInfo } from '../model/passenger-narrowed-info.model';
import { SimpleUser } from '../model/simple-user.model';
import { AuthService } from './auth.service';
import { RideService } from './ride.service';
import { Ride } from '../model/ride.model';
import { PaginatedResponse } from '../model/paginated-response.model';

@Injectable({
  providedIn: 'root',
})
export class PassengerService {
  
  private hasActiveRide$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  getHasActiveRide(): boolean {
    if (this.authService.getRole() == "ROLE_PASSENGER") {
      return this.hasActiveRide$.getValue();
    } else {
      throw Error("Only passengers can access this method");      
    }
  }

  setHasActiveRide(hasActive: boolean) {
    if (this.authService.getRole() == "ROLE_PASSENGER") {
      this.hasActiveRide$.next(hasActive);
    } else {
      throw Error("Only passengers can access this method");
    }
  }

  constructor(private http: HttpClient, private authService: AuthService, private rideService: RideService) {
    if (this.authService.getRole() == "ROLE_PASSENGER") {
      this.rideService.getPassengersActiveRide(this.authService.getId()).subscribe({
        next: (ride: Ride) => {
          this.setHasActiveRide(true);
        },
        error: (error) => {
          if (error instanceof HttpErrorResponse) {
            this.setHasActiveRide(false);
          }
        }
      });
    }
  }

  public create(passenger: Passenger): Observable<Passenger> {
    return this.http.post<Passenger>(environment.localhostApi + 'passenger', passenger);
  }

  public getPassenger(passengerId: number): Observable<Passenger> {
    return this.http.get<Passenger>(environment.localhostApi + `passenger/${passengerId}`);
  }

  public updatePassenger(form : NgForm): Observable<any>{
    return this.http.put(environment.localhostApi + "passenger/2", form.value)
  }

  // email, full name and profile picture
  public getNarrowedProfileData(id: number): Observable<PassengerNarrowedInfo> {
    return this.http.get<PassengerNarrowedInfo>(environment.localhostApi + `passenger/${id}/narrowed-profile-info`);
  }

  public getByEmail(passenger: SimpleUser): Observable<SimpleUser> {
    return this.http.post<SimpleUser>(environment.localhostApi + `passenger/by-email`, passenger);
  }

  public getPassengers():Observable<PaginatedResponse<Passenger>>{
    return this.http.get<PaginatedResponse<Passenger>>(environment.localhostApi+"passenger");
  }
}
