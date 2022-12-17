import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Vehicle } from '../model/vehicle.model';
import { VehicleDTO } from '../model/vehicle-dto';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  constructor(private http: HttpClient) {}

  public getVehicles() : Observable<Vehicle[]>{
    return this.http.get<Vehicle[]>(environment.localhostApi + "vehicle");
  }

  public setDriver(vehicleId : number, driverId : number) : Observable<Vehicle>{
    return this.http.put<Vehicle>(environment.localhostApi + "vehicle/" + vehicleId + "/driver/" + driverId, "");
  } 

  public save(vehicle:VehicleDTO):Observable<VehicleDTO>{
    return this.http.post<VehicleDTO>(environment.localhostApi + "vehicle", vehicle);
  }
}
