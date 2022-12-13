import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TomTomGeolocationResponse } from '../model/tom-tom-geolocation-response.model';
import { Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TomTomGeolocationService {

  private apiKey: string = 'urES86sMdjoeMbhSLu9EK3ksu0Jjpb91';

  constructor(private http: HttpClient) { }

  getGeocode(address: string): Observable<TomTomGeolocationResponse> {
    const request: string = `https://api.tomtom.com/search/2/geocode/${address}.json?key=${this.apiKey}`;
    return this.http.get<TomTomGeolocationResponse>(request);
  }

  reverseGeocode(latitude: number, longitude: number): Observable<TomTomGeolocationResponse> {
    const request: string = `https://api.tomtom.com/search/2/reverseGeocode/${latitude},${longitude}.json?key=${this.apiKey}&radius=100`;
    return this.http.get<TomTomGeolocationResponse>(request);
  }

  getRoute(startLatitude: number, startLongitude: number, endLatitude: number, endLongitude: number): Observable<any> {
    const request: string = `https://api.tomtom.com/routing/1/calculateRoute/${startLatitude},${startLongitude}:${endLatitude},${endLongitude}/json?key=${this.apiKey}&travelMode=car`;
    return this.http.get<any>(request);  // 'response.routes[0].summary.lengthInMeters' for distance
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
