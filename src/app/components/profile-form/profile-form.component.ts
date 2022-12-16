import { Component, OnInit } from '@angular/core';
import { PassengerService } from 'src/app/services/passenger.service';
import { FormBuilder, NgForm } from '@angular/forms';
import { Passenger } from 'src/app/model/passenger.model';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent{

  passenger = {} as Passenger;
  message:String = ""
  succesfull : Boolean = true;

  constructor(private passengerService : PassengerService) {}

  onSubmit(f: NgForm): void {
    // Process checkout data here
    this.passengerService.updatePassenger(f).subscribe({
      next: () => {
        this.message = "Data succesfully updated";
      },
      error: () => {
        this.message = "An error occured";
      }
    });
  }
}
