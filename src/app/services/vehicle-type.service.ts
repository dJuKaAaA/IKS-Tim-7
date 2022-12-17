import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VehicleType } from '../model/vehicle-type';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

const API_URL: string = "http://localhost:8081/api/vehicleType";

@Injectable({
  providedIn: 'root'
})
export class VehicleTypeService {

  constructor(private http: HttpClient) {}

  public getAll() : Observable<VehicleType[]>{
    return this.http.get<VehicleType[]>(environment.localhostApi + "vehicleType")
  }

}
