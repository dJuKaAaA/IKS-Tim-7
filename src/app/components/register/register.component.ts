import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Passenger } from 'src/app/model/passenger.model';
import { PassengerService } from 'src/app/services/passenger.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  mainImagePath: string = "../../../assets/register-side-img.png"
  taxiIconPath: string = "../../../assets/taxi.png";

  repeatedPassword: string = "";
  termsAndConditionsAgreement: boolean = false;

  passenger: Passenger = {
    name: "", 
    surname: "", 
    profilePicture: "", 
    telephoneNumber: "",
    email: "",
    address: "", 
    password: ""
  };

  submitted: boolean = false;

  constructor(private passengerService: PassengerService) {

  }

  ngOnInit(): void {

  }

  onSubmit() {
    this.passengerService.create(this.passenger);
  }

  termsAndConditionsOnChecked(event: any) {
    this.termsAndConditionsAgreement = event.checked;
  }


}