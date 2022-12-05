import { Injectable } from '@angular/core';
import { Passenger } from '../model/passenger.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const API_URL: string = "http://localhost:8081/api/v1/vehicle";

@Injectable({
  providedIn: 'root'
})
export class PassengerService {

  constructor(private http: HttpClient) { }

  public create(passenger: Passenger): void {
    this.http.post(API_URL, passenger);
  }

}
