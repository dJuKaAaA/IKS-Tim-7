import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { DriverProfileChangeRequest } from '../model/driver-profile-change-request.model';

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
}
