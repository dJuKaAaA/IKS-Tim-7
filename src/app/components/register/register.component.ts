import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Passenger } from 'src/app/model/passenger.model';
import { PassengerService } from 'src/app/services/passenger.service';
import { environment } from 'src/environment/environment';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  mainImagePath: string = environment.registerSideImg;
  taxiIconPath: string = environment.taxiIcon;

  repeatedPassword: string = "";
  termsAndConditionsAgreement: boolean = false;

  formGroup: FormGroup = new FormGroup({
    name: new FormControl(""),
    surname: new FormControl(""),
    profilePicture: new FormControl(""),
    telephoneNumber: new FormControl(""),
    email: new FormControl(""),
    address: new FormControl(""),
    password: new FormControl(""),
    confirmPassword: new FormControl(""),
  });

  errorMessage: string = "";

  constructor(private passengerService: PassengerService, private router: Router, private matDialog: MatDialog) {

  }

  createAccount() {
    if (this.formGroup.controls['password'].value != this.formGroup.controls['confirmPassword'].value) {

      this.matDialog.open(DialogComponent, {
        data: {
          header: "Error!",
          body: "Password not confirmed"
        }
      });
      return;
    }

    const passenger: Passenger = {
      name: this.formGroup.controls['name'].value,
      surname: this.formGroup.controls['surname'].value,
      profilePicture: this.formGroup.controls['profilePicture'].value,
      telephoneNumber: this.formGroup.controls['telephoneNumber'].value,
      email: this.formGroup.controls['email'].value,
      address: this.formGroup.controls['address'].value,
      password: this.formGroup.controls['password'].value
    };
    if (this.formGroup.valid) {
      this.passengerService.create(passenger).subscribe({
        next: (result) => {
          this.matDialog.open(DialogComponent, {
            data: {
              header: "Success! One more step...",
              body: "Check your mail to activate your account"
            }
          });
          this.router.navigate(['']);
        },
        error: (error) => {
          if (error instanceof HttpErrorResponse) {
            this.errorMessage = error.error.message;
          }
        },
      });
    }
  }

  termsAndConditionsOnChecked(event: any): void {
    this.termsAndConditionsAgreement = event.checked;
  }

  goToHome(): void {
    this.router.navigate([""]);
  }


}