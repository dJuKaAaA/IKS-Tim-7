import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TomTomGeolocationResponse } from '../model/tom-tom-geolocation-response.model';
import { Subscriber } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class TomTomGeolocationService {

  constructor(private http: HttpClient) { }

  getGeocode(address: string): Observable<TomTomGeolocationResponse> {
    const request: string = `${environment.ttApiUrl}/search/2/geocode/${address}.json?key=${environment.ttApiKey}`;
    return this.http.get<TomTomGeolocationResponse>(request);
  }

  reverseGeocode(latitude: number, longitude: number): Observable<any> {
    const request: string = `${environment.ttApiUrl}/search/2/reverseGeocode/${latitude},${longitude}.json?key=${environment.ttApiKey}&radius=100`;
    return this.http.get<TomTomGeolocationResponse>(request);
  }

  // response.routes[0].summary.lengthInMeters for distance
  // response.routes[0].legs[0].points for route points
  // response.routes[0].summary.travelTimeInSeconds for travel time
  getRoute(startLatitude: number, startLongitude: number, endLatitude: number, endLongitude: number): Observable<any> {
    const request: string = `${environment.ttApiUrl}/routing/1/calculateRoute/${startLatitude},${startLongitude}:${endLatitude},${endLongitude}/json?key=${environment.ttApiKey}&travelMode=car`;
    console.log(request);
    return this.http.get<any>(request);  
  }

  // copied and pasted code from tomtom api
  // TODO: Study how this code works
  getCurrentPosition(): any {
    return new Observable((observer: Subscriber<any>) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position: any) => {
          observer.next({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        observer.complete();
      });
      } else {
        observer.error();
      }
    });
  }

}
