import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Passenger } from 'app/models/passenger.model';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PassengerService {
  private apiURL: string = 'http://localhost:4200/api/passenger/1';

  constructor(private http: HttpClient) {}

  public updatePassenger(form : NgForm){
    this.http.put(this.apiURL, form.value).subscribe(data => console.log(data));
  }
}

