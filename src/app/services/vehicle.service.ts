import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Vehicle } from '../model/vehicle.model';
import { ThisReceiver } from '@angular/compiler';
import { VehicleDTO } from '../model/vehicle-dto';

const API_URL: string = "http://localhost:8081/api/vehicle";

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  constructor(private http: HttpClient) {}

  public getVehicles() : Observable<Vehicle[]>{
    return this.http.get<Vehicle[]>(API_URL);
  }

  public setDriver(vehicleId : number, driverId : number) : Observable<Vehicle>{
    return this.http.put<Vehicle>(API_URL+"/"+vehicleId+"/driver/" + driverId ,"");
  } 

  public save(vehicle:VehicleDTO):Observable<VehicleDTO>{
    return this.http.post<VehicleDTO>(API_URL, vehicle);
  }
}
