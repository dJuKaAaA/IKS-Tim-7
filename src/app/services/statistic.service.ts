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

  public getDistanceTraveledPerDayByEmail(email: string, createReport: CreateReport): Observable<Array<ResponseReport>> {
    return this.http.post<Array<ResponseReport>>(environment.localhostApi + `statistic/traveledDistancePerDayByEmail/${email}`, createReport);
  }

  public getNumberOfRidesPerDayByEmail(email: string, createReport: CreateReport): Observable<Array<ResponseReport>> {
    return this.http.post<Array<ResponseReport>>(environment.localhostApi + `statistic/numberOfRidesPerDayByEmail/${email}`, createReport);
  }

  public getFinancialsPerDayByEmail(email: string, createReport: CreateReport): Observable<Array<ResponseReport>> {
    return this.http.post<Array<ResponseReport>>(environment.localhostApi + `statistic/financialsPerDayByEmail/${email}`, createReport);
  }

  public getDistanceTraveledPerDayAllDrivers(createReport: CreateReport): Observable<Array<ResponseReport>> {
    return this.http.post<Array<ResponseReport>>(environment.localhostApi + 'statistic/traveledDistancePerDay/drivers', createReport);
  }

  public getNumberOfRidesPerDayAllDrivers(createReport: CreateReport): Observable<Array<ResponseReport>> {
    return this.http.post<Array<ResponseReport>>(environment.localhostApi + 'statistic/numberOfRidesPerDay/drivers', createReport);
  }
  
  public getFinancialsPerDayAllDrivers(createReport: CreateReport): Observable<Array<ResponseReport>> {
    return this.http.post<Array<ResponseReport>>(environment.localhostApi + 'statistic/financialsPerDay/drivers', createReport);
  }

  public getDistanceTraveledPerDayAllPassengers(createReport: CreateReport): Observable<Array<ResponseReport>> {
    return this.http.post<Array<ResponseReport>>(environment.localhostApi + 'statistic/traveledDistancePerDay/passengers', createReport);
  }

  public getNumberOfRidesPerDayAllPassengers(createReport: CreateReport): Observable<Array<ResponseReport>> {
    return this.http.post<Array<ResponseReport>>(environment.localhostApi + 'statistic/numberOfRidesPerDay/passengers', createReport);
  }
  
  public getFinancialsPerDayAllPassengers(createReport: CreateReport): Observable<Array<ResponseReport>> {
    return this.http.post<Array<ResponseReport>>(environment.localhostApi + 'statistic/financialsPerDay/passengers', createReport);
  }
}
