import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { CreateReport } from '../model/report/create-report.model';
import { ResponseReport } from '../model/report/response-report.model';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor(private http: HttpClient) { }

  public getDistanceTraveledPerDay(userId: number, createReport: CreateReport): Observable<Array<ResponseReport>> {
    return this.http.post<Array<ResponseReport>>(environment.localhostApi + `statistic/traveledDistancePerDay/${userId}`, createReport);
  }

  public getNumberOfRidesPerDay(userId: number, createReport: CreateReport): Observable<Array<ResponseReport>> {
    return this.http.post<Array<ResponseReport>>(environment.localhostApi + `statistic/numberOfRidesPerDay/${userId}`, createReport);
  }

  public getFinancialsPerDay(userId: number, createReport: CreateReport): Observable<Array<ResponseReport>> {
    return this.http.post<Array<ResponseReport>>(environment.localhostApi + `statistic/financialsPerDay/${userId}`, createReport);
  }
}
