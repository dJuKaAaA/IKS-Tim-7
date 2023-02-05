import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MatFormFieldModule } from '@angular/material/form-field'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { DriverService } from 'src/app/services/driver.service';
import { WorkHour } from 'src/app/model/work-hours';
import { HttpErrorResponse } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { RegisterComponent } from './register.component';
import { PassengerService } from 'src/app/services/passenger.service';
import { Passenger } from 'src/app/model/passenger.model';

describe('Register', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let dialog:any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        MatDialogModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
      ],
      declarations: [RegisterComponent],
      providers: [MatDialog],
    }).compileComponents();
    dialog = TestBed.inject(MatDialog);
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Name is empty', async () => {
    let name = "";
    let surname = "proba";
    let telephoneNumber = "0608286030"
    let email = "email.e@email.com";
    let address = "Cara Lazara 38"
    let password = "pass123";
    let confirmPassword = "pass123";
    let profilePicture = "";

    let router = fixture.debugElement.injector.get(Router);

    component.formGroup.setValue({
      name:name,
      surname:surname,
      telephoneNumber:telephoneNumber,
      email:email,
      address:address,
      password:password,
      confirmPassword:confirmPassword,
      profilePicture:profilePicture
  
    });

    spyOn(router, 'navigate').and.stub();

    component.createAccount();

    fixture.detectChanges();

    expect(router.navigate).not.toHaveBeenCalled();
    expect(component.formGroup.valid).toBeFalsy();
  });

  it('Surname is empty', async () => {
    let name = "proba";
    let surname = "";
    let telephoneNumber = "0608286030"
    let email = "email.e@email.com";
    let address = "Cara Lazara 38"
    let password = "pass123";
    let confirmPassword = "pass123";
    let profilePicture = "";

    let router = fixture.debugElement.injector.get(Router);

    component.formGroup.setValue({
      name:name,
      surname:surname,
      telephoneNumber:telephoneNumber,
      email:email,
      address:address,
      password:password,
      confirmPassword:confirmPassword,
      profilePicture:profilePicture
  
    });

    spyOn(router, 'navigate').and.stub();

    component.createAccount();

    fixture.detectChanges();

    expect(router.navigate).not.toHaveBeenCalled();
    expect(component.formGroup.valid).toBeFalsy();
  });

  it('Telephone number is empty', async () => {
    let name = "proba";
    let surname = "proba";
    let telephoneNumber = ""
    let email = "email.e@email.com";
    let address = "Cara Lazara 38"
    let password = "pass123";
    let confirmPassword = "pass123";
    let profilePicture = "";

    let router = fixture.debugElement.injector.get(Router);

    component.formGroup.setValue({
      name:name,
      surname:surname,
      telephoneNumber:telephoneNumber,
      email:email,
      address:address,
      password:password,
      confirmPassword:confirmPassword,
      profilePicture:profilePicture
  
    });

    spyOn(router, 'navigate').and.stub();

    component.createAccount();

    fixture.detectChanges();

    expect(router.navigate).not.toHaveBeenCalled();
    expect(component.formGroup.valid).toBeFalsy();
  });

  it('Email is empty', async () => {
    let name = "proba";
    let surname = "proba";
    let telephoneNumber = "0608286030"
    let email = "";
    let address = "Cara Lazara 38"
    let password = "pass123";
    let confirmPassword = "pass123";
    let profilePicture = "";

    let router = fixture.debugElement.injector.get(Router);

    component.formGroup.setValue({
      name:name,
      surname:surname,
      telephoneNumber:telephoneNumber,
      email:email,
      address:address,
      password:password,
      confirmPassword:confirmPassword,
      profilePicture:profilePicture
  
    });

    spyOn(router, 'navigate').and.stub();

    component.createAccount();

    fixture.detectChanges();

    expect(router.navigate).not.toHaveBeenCalled();
    expect(component.formGroup.valid).toBeFalsy();
  });

  it('Adress is empty', async () => {
    let name = "proba";
    let surname = "proba";
    let telephoneNumber = "0608286030"
    let email = "email.e@email.com";
    let address = ""
    let password = "pass123";
    let confirmPassword = "pass123";
    let profilePicture = "";

    let router = fixture.debugElement.injector.get(Router);

    component.formGroup.setValue({
      name:name,
      surname:surname,
      telephoneNumber:telephoneNumber,
      email:email,
      address:address,
      password:password,
      confirmPassword:confirmPassword,
      profilePicture:profilePicture
  
    });

    spyOn(router, 'navigate').and.stub();

    component.createAccount();

    fixture.detectChanges();

    expect(router.navigate).not.toHaveBeenCalled();
    expect(component.formGroup.valid).toBeFalsy();
  });

  it('password is empty', async () => {
    let name = "proba";
    let surname = "proba";
    let telephoneNumber = "0608286030"
    let email = "email.e@email.com";
    let address = "Cara Lazara 38"
    let password = "";
    let confirmPassword = "pass123";
    let profilePicture = "";

    let router = fixture.debugElement.injector.get(Router);

    component.formGroup.setValue({
      name:name,
      surname:surname,
      telephoneNumber:telephoneNumber,
      email:email,
      address:address,
      password:password,
      confirmPassword:confirmPassword,
      profilePicture:profilePicture
  
    });

    spyOn(router, 'navigate').and.stub();

    component.createAccount();

    fixture.detectChanges();

    expect(router.navigate).not.toHaveBeenCalled();
    expect(component.formGroup.valid).toBeFalsy();
  });

  it('Confirm password does not match password', async () => {
    let name = "proba";
    let surname = "proba";
    let telephoneNumber = "0608286030"
    let email = "email.e@email.com";
    let address = "Cara Lazara 38"
    let password = "pass123";
    let confirmPassword = "";
    let profilePicture = "";

    let router = fixture.debugElement.injector.get(Router);
    let matDialog = fixture.debugElement.injector.get(MatDialog);

    component.formGroup.setValue({
      name:name,
      surname:surname,
      telephoneNumber:telephoneNumber,
      email:email,
      address:address,
      password:password,
      confirmPassword:confirmPassword,
      profilePicture:profilePicture
  
    });

    spyOn(router, 'navigate').and.stub();

    component.createAccount();

    fixture.detectChanges();

    expect(router.navigate).not.toHaveBeenCalled();
    expect(dialog.openDialogs.length).toBeTruthy();
  });

  it('Bad email format should return error', async () => {
    let name = "proba";
    let surname = "proba";
    let telephoneNumber = "0608286030"
    let email = "email.eemail.com";
    let address = "Cara Lazara 38"
    let password = "Pass123pass";
    let confirmPassword = "Pass123pass";
    let profilePicture = "";

    let router = fixture.debugElement.injector.get(Router);
    let passengerService = fixture.debugElement.injector.get(PassengerService);

    component.formGroup.setValue({
      name:name,
      surname:surname,
      telephoneNumber:telephoneNumber,
      email:email,
      address:address,
      password:password,
      confirmPassword:confirmPassword,
      profilePicture:profilePicture
  
    });

    let passenger:Passenger = {
      name : "proba",
      surname : "proba",
      telephoneNumber : "0608286030",
      email : "email.eemail.com",
      address : "Cara Lazara 38",
      password : "Pass123pass",
      profilePicture : "",
    }

    spyOn(router, 'navigate').and.stub();
    spyOn(passengerService, 'create').and.returnValue(
      throwError(
        new HttpErrorResponse({
          error: {message:'Invalid data. For example bad email format.'},
          status: 400,
        })
      )
    );

    component.createAccount();

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(router.navigate).not.toHaveBeenCalled();
      expect(component.errorMessage).toEqual("Invalid data. For example bad email format.");
    });
  });

  it('Bad phone number lenght', async () => {
    let name = "proba";
    let surname = "proba";
    let telephoneNumber = "060"
    let email = "email.e@email.com";
    let address = "Cara Lazara 38"
    let password = "Pass123pass";
    let confirmPassword = "Pass123pass";
    let profilePicture = "";

    let router = fixture.debugElement.injector.get(Router);
    let matDialog = fixture.debugElement.injector.get(MatDialog);
    let passengerService = fixture.debugElement.injector.get(PassengerService);

    component.formGroup.setValue({
      name:name,
      surname:surname,
      telephoneNumber:telephoneNumber,
      email:email,
      address:address,
      password:password,
      confirmPassword:confirmPassword,
      profilePicture:profilePicture
  
    });

    spyOn(router, 'navigate').and.stub();
    spyOn(passengerService, 'create').and.returnValue(
      throwError(
        new HttpErrorResponse({
          error: {message:'Phone number have between 7 and 15 digits'},
          status: 400,
        })
      )
    );

    component.createAccount();

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(router.navigate).not.toHaveBeenCalled();
      expect(component.errorMessage).toEqual("Phone number have between 7 and 15 digits");
    });
  });

  it('Bad phone number format', async () => {
    let name = "proba";
    let surname = "proba";
    let telephoneNumber = "060sasd"
    let email = "email.e@email.com";
    let address = "Cara Lazara 38"
    let password = "Pass123pass";
    let confirmPassword = "Pass123pass";
    let profilePicture = "";

    let router = fixture.debugElement.injector.get(Router);
    let matDialog = fixture.debugElement.injector.get(MatDialog);
    let passengerService = fixture.debugElement.injector.get(PassengerService);

    component.formGroup.setValue({
      name:name,
      surname:surname,
      telephoneNumber:telephoneNumber,
      email:email,
      address:address,
      password:password,
      confirmPassword:confirmPassword,
      profilePicture:profilePicture
  
    });

    spyOn(router, 'navigate').and.stub();
    spyOn(passengerService, 'create').and.returnValue(
      throwError(
        new HttpErrorResponse({
          error: {message:'Invalid telephone number'},
          status: 400,
        })
      )
    );

    component.createAccount();

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(router.navigate).not.toHaveBeenCalled();
      expect(component.errorMessage).toEqual("Invalid telephone number");
    });
  });

  it('Password does not contain capital letters', async () => {
    let name = "proba";
    let surname = "proba";
    let telephoneNumber = "0608286030"
    let email = "email.e@email.com";
    let address = "Cara Lazara 38"
    let password = "pass123passpass";
    let confirmPassword = "pass123passpass";
    let profilePicture = "";

    let router = fixture.debugElement.injector.get(Router);
    let matDialog = fixture.debugElement.injector.get(MatDialog);
    let passengerService = fixture.debugElement.injector.get(PassengerService);

    component.formGroup.setValue({
      name:name,
      surname:surname,
      telephoneNumber:telephoneNumber,
      email:email,
      address:address,
      password:password,
      confirmPassword:confirmPassword,
      profilePicture:profilePicture
  
    });

    spyOn(router, 'navigate').and.stub();
    spyOn(passengerService, 'create').and.returnValue(
      throwError(
        new HttpErrorResponse({
          error: {message:'Password must contain at least one uppercase letter'},
          status: 400,
        })
      )
    );

    component.createAccount();

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(router.navigate).not.toHaveBeenCalled();
      expect(component.errorMessage).toEqual("Password must contain at least one uppercase letter");
    });
  });

  it('Password does not contain lowercase letters', async () => {
    let name = "proba";
    let surname = "proba";
    let telephoneNumber = "0608286030"
    let email = "email.e@email.com";
    let address = "Cara Lazara 38"
    let password = "PASS123PASD";
    let confirmPassword = "PASS123PASD";
    let profilePicture = "";

    let router = fixture.debugElement.injector.get(Router);
    let matDialog = fixture.debugElement.injector.get(MatDialog);
    let passengerService = fixture.debugElement.injector.get(PassengerService);

    component.formGroup.setValue({
      name:name,
      surname:surname,
      telephoneNumber:telephoneNumber,
      email:email,
      address:address,
      password:password,
      confirmPassword:confirmPassword,
      profilePicture:profilePicture
  
    });

    spyOn(router, 'navigate').and.stub();
    spyOn(passengerService, 'create').and.returnValue(
      throwError(
        new HttpErrorResponse({
          error: {message:'Password must contain at least one lowercase letter'},
          status: 400,
        })
      )
    );

    component.createAccount();

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(router.navigate).not.toHaveBeenCalled();
      expect(component.errorMessage).toEqual("Password must contain at least one lowercase letter");
    });
  });

  it('Password does not contains numbers', async () => {
    let name = "proba";
    let surname = "proba";
    let telephoneNumber = "0608286030"
    let email = "email.e@email.com";
    let address = "Cara Lazara 38"
    let password = "Passsssss";
    let confirmPassword = "Passsssss";
    let profilePicture = "";

    let router = fixture.debugElement.injector.get(Router);
    let matDialog = fixture.debugElement.injector.get(MatDialog);
    let passengerService = fixture.debugElement.injector.get(PassengerService);

    component.formGroup.setValue({
      name:name,
      surname:surname,
      telephoneNumber:telephoneNumber,
      email:email,
      address:address,
      password:password,
      confirmPassword:confirmPassword,
      profilePicture:profilePicture
  
    });

    spyOn(router, 'navigate').and.stub();
    spyOn(passengerService, 'create').and.returnValue(
      throwError(
        new HttpErrorResponse({
          error: {message:'Password must contain at least one number'},
          status: 400,
        })
      )
    );

    component.createAccount();

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(router.navigate).not.toHaveBeenCalled();
      expect(component.errorMessage).toEqual("Password must contain at least one number");
    });
  });

  it('Password is too short', async () => {
    let name = "proba";
    let surname = "proba";
    let telephoneNumber = "0608286030"
    let email = "email.e@email.com";
    let address = "Cara Lazara 38"
    let password = "Pa1";
    let confirmPassword = "Pa1";
    let profilePicture = "";

    let router = fixture.debugElement.injector.get(Router);
    let matDialog = fixture.debugElement.injector.get(MatDialog);
    let passengerService = fixture.debugElement.injector.get(PassengerService);

    component.formGroup.setValue({
      name:name,
      surname:surname,
      telephoneNumber:telephoneNumber,
      email:email,
      address:address,
      password:password,
      confirmPassword:confirmPassword,
      profilePicture:profilePicture
  
    });

    spyOn(router, 'navigate').and.stub();
    spyOn(passengerService, 'create').and.returnValue(
      throwError(
        new HttpErrorResponse({
          error: {message:'Password must be between 8 and 20 characters'},
          status: 400,
        })
      )
    );

    component.createAccount();

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(router.navigate).not.toHaveBeenCalled();
      expect(component.errorMessage).toEqual("Password must be between 8 and 20 characters");
    });
  });

  it('Password is too long', async () => {
    let name = "proba";
    let surname = "proba";
    let telephoneNumber = "0608286030"
    let email = "email.e@email.com";
    let address = "Cara Lazara 38"
    let password = "Pass1231231sdasdasdasdasddads";
    let confirmPassword = "Pass1231231sdasdasdasdasddads";
    let profilePicture = "";

    let router = fixture.debugElement.injector.get(Router);
    let matDialog = fixture.debugElement.injector.get(MatDialog);
    let passengerService = fixture.debugElement.injector.get(PassengerService);

    component.formGroup.setValue({
      name:name,
      surname:surname,
      telephoneNumber:telephoneNumber,
      email:email,
      address:address,
      password:password,
      confirmPassword:confirmPassword,
      profilePicture:profilePicture
  
    });

    spyOn(router, 'navigate').and.stub();
    spyOn(passengerService, 'create').and.returnValue(
      throwError(
        new HttpErrorResponse({
          error: {message:'Password must be between 8 and 20 characters'},
          status: 400,
        })
      )
    );

    component.createAccount();

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(router.navigate).not.toHaveBeenCalled();
      expect(component.errorMessage).toEqual("Password must be between 8 and 20 characters");
    });

  });
  

});
