import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Passenger } from 'app/models/passenger.model';

@Injectable({
  providedIn: 'root'
})
export class PassengerService {
  private apiURL: string = 'http://localhost:8081/api/vehicle';

  constructor(private http: HttpClient) {}

  public updatePassenger(passenger:Passenger){
    this.http.put(this.apiURL, passenger);
  }
}

