import { Injectable } from '@angular/core';
import { Passenger } from '../model/passenger.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class PassengerService {
  constructor(private http: HttpClient) {}

  public create(passenger: Passenger): Observable<Passenger> {
    return this.http.post<Passenger>(environment.localhostApi + 'passenger', passenger);
  }

  public getPassenger(passengerId: number): Observable<Passenger> {
    return this.http.get<Passenger>(environment.localhostApi + `passenger/${passengerId}`);
  }

  public updatePassenger(form : NgForm): Observable<any>{
    return this.http.put(environment.localhostApi + "passenger/2", form.value)
  }
}
