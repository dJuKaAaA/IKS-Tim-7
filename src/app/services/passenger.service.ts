import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Passenger } from '../model/passenger.model';
@Injectable({
  providedIn: 'root',
})
export class PassengerService {
  private apiURL: string = `http://localhost:8081/api/passenger/{id}`;
  constructor(private http: HttpClient) {}

  public getPassenger(passengerId: number): Observable<Passenger> {
    this.apiURL = `http://localhost:8081/api/passenger/${passengerId}`;
    return this.http.get<Passenger>(this.apiURL);
  }
}
