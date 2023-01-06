import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Vehicle } from '../model/vehicle.model';
import { VehicleDTO } from '../model/vehicle-dto';
import { environment } from 'src/environment/environment';
import { VehiclePage } from '../model/vehicle-page';
import { Location } from '../model/location.model';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  constructor(private http: HttpClient) {}

  public getVehicles() : Observable<VehiclePage>{
    return this.http.get<VehiclePage>(environment.localhostApi + "vehicle");
  }

  public setDriver(vehicleId : number, driverId : number) : Observable<Vehicle>{
    return this.http.put<Vehicle>(environment.localhostApi + "vehicle/" + vehicleId + "/driver/" + driverId, "");
  } 

  public save(vehicle:VehicleDTO):Observable<Vehicle>{
    console.log(vehicle);
    return this.http.post<Vehicle>(environment.localhostApi + "vehicle", vehicle);
  }

  public setLocation(id: number, location: Location) {
    return this.http.put(environment.localhostApi + `vehicle/${id}/location`, location);
  }
}
