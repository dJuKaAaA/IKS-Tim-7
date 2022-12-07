import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private passengerService: PassengerService, private router: Router) {

  }

  ngOnInit(): void {

  }

  createAccount() {
    this.passengerService.create(this.passenger).subscribe();
    alert("Passenger successfully created!");

    // reseting the form
    this.passenger = {
      name: "", 
      surname: "", 
      profilePicture: "", 
      telephoneNumber: "",
      email: "",
      address: "", 
      password: ""
    };
    this.repeatedPassword = "";
    this.termsAndConditionsAgreement = false;
    
  }

  termsAndConditionsOnChecked(event: any) {
    this.termsAndConditionsAgreement = event.checked;
  }


}