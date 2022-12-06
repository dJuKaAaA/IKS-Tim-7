import { Component, OnInit } from '@angular/core';
import { PassengerService } from 'app/services/passenger.service';
import { FormBuilder, NgForm } from '@angular/forms';
import { Passenger } from 'app/models/passenger.model';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent{

  passenger = {} as Passenger;

  constructor(private passengerService : PassengerService) {}

  onSubmit(f: NgForm): void {
    // Process checkout data here
    this.passengerService.updatePassenger(f);
  }
}
