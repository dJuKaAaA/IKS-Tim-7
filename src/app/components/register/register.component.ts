import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Passenger } from 'src/app/model/passenger.model';
import { PassengerService } from 'src/app/services/passenger.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  mainImagePath: string = "src/assets/register-side-img.png"
  taxiIconPath: string = "src/assets/taxi.png";

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

  constructor(private passengerService: PassengerService, private router: Router, private matDialog: MatDialog) {

  }

  ngOnInit(): void {

  }

  createAccount() {
    this.passengerService.create(this.passenger).subscribe();
    this.matDialog.open(DialogComponent, {
      data: {
        header: "Success!",
        body: "Account successfully created"
      }
    });

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

  termsAndConditionsOnChecked(event: any): void {
    this.termsAndConditionsAgreement = event.checked;
  }

  goToHome(): void {
    this.router.navigate([""]);
  }


}