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
  notificationOffset:String = "-70px";
  notificationText:String = "Data saved";
  succesfull : Boolean = true;

  constructor(private passengerService : PassengerService) {}

  onSubmit(f: NgForm): void {
    // Process checkout data here
    this.passengerService.updatePassenger(f).subscribe({
      next: () => {
        this.notificationText = "Data saved";
        this.notificationOffset = "30px";
        setTimeout(()=>{
        this.notificationOffset = "-70px"
    }, 3000);
      },
      error: () => {
        this.notificationText = "Error occured";
        this.notificationOffset = "30px";
        setTimeout(()=>{
        this.notificationOffset = "-70px"
        }, 3000);
      }
    });
  }

  closeNotification(): void{
    this.notificationOffset = "-70px";
  }
}
