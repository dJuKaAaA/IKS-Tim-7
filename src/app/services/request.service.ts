import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { DriverProfileChangeRequest } from '../model/driver-profile-change-request.model';
import { RequestExistence } from '../model/requestExistence';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private http: HttpClient) {}

  public saveDriverProfileChangeRequest(
    driverId: number,
    request: DriverProfileChangeRequest
  ): Observable<DriverProfileChangeRequest> {
    return this.http.post<DriverProfileChangeRequest>(
      environment.localhostApi + `driver/request/${driverId}`,
      request
    );
  }

  public getRequestByDriverId(id:number):Observable<DriverProfileChangeRequest>{
    return this.http.get<DriverProfileChangeRequest>(environment.localhostApi + `driver/request/${id}`)
  }

  public getAllRequests():Observable<DriverProfileChangeRequest[]>{
    return this.http.get<DriverProfileChangeRequest[]>(environment.localhostApi + `driver/request`);
  }

  public getAllPendingRequests():Observable<DriverProfileChangeRequest[]> {
    return this.http.get<DriverProfileChangeRequest[]>(environment.localhostApi + `driver/request/pending`);
  }

  public aprove(requestId:number){
    return this.http.put(environment.localhostApi + `driver/request/${requestId}/approve`, "");
  }

  
  public deny(requestId:number){
    return this.http.put(environment.localhostApi + `driver/request/${requestId}/deny`, "");
  }

  public getIsDriverHaveRequest(
    driverId: number
  ): Observable<RequestExistence> {
    return this.http.get<RequestExistence>(
      environment.localhostApi + `driver/request/isExist/${driverId}`
    );
  }
}
