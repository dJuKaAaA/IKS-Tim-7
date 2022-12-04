import { Injectable } from '@angular/core';
import Vehicle from '../interfaces/Vehicle';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const API_URL: string = "http://localhost:8081/api/v1/vehicle"

@Injectable({
  providedIn: 'root',
})
export class VehicleService {

  constructor(private http: HttpClient) {}

  public findAll(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(API_URL);
  }
}
