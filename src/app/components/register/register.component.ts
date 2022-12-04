import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Passenger } from 'src/app/model/passenger.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  mainImagePath: string = "../../../assets/pexels-alex-9878865.jpg"
  taxiIconPath: string = "../../../assets/taxi.png";

  textInputSize = "400px";

  repeatedPassword: string = "";
  termAndPrivacyAgreement: boolean = false;

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

  onSubmit() {
    this.submitted = !this.submitted;
  }

  ngOnInit(): void {

  }

}