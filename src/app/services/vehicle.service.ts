import { Injectable } from '@angular/core';
import { Vehicle } from '../interfaces/Vehicle';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private apiURL: string = 'http://localhost:8081/api/vehicle';

  constructor(private http: HttpClient) {}

  public findAll(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.apiURL);
  }
}
