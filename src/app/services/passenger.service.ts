import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Passenger } from 'app/models/passenger.model';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PassengerService {
  private apiURL: string = 'http://localhost:8081/api/passenger/2'; 

  constructor(private http: HttpClient) {}

  public updatePassenger(form : NgForm): Boolean{
    try{
      this.http.put(this.apiURL, form.value).subscribe(data => console.log(data));
    }catch{
      return false;
    }
    return true;
  }
}

