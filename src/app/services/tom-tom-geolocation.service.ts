import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TomTomGeolocationResponse } from '../model/tom-tom-geolocation-response.model';
import { Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TomTomGeolocationService {

  constructor(private http: HttpClient) { }

  geolocate(address: string, ttApiKey: string): Observable<TomTomGeolocationResponse> {
    const request: string = `https://api.tomtom.com/search/2/geocode/${address}.json?key=${ttApiKey}`;
    return this.http.get<TomTomGeolocationResponse>(request);
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
