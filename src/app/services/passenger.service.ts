import { Injectable } from '@angular/core';
import { Passenger } from '../model/passenger.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

const API_URL: string = "http://localhost:8081/";

@Injectable({
  providedIn: 'root'
})
export class PassengerService {

  constructor(private http: HttpClient) { }

  public create(passenger: Passenger): Observable<Passenger> {
    return this.http.post<Passenger>(API_URL + "api/passenger", passenger);
  }

  public getPassenger(passengerId: number): Observable<Passenger> {
    return this.http.get<Passenger>(API_URL + "api/passenger/" + passengerId);
  }

  public updatePassenger(form : NgForm): Observable<any>{
    return this.http.put(API_URL + "api/passenger/2", form.value)
  }

}

