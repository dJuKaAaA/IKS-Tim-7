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
import { UserService } from 'src/app/services/user.service';
import { Passenger } from 'src/app/model/passenger.model';
import { PassengerService } from 'src/app/services/passenger.service';

describe('Register', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let dialog: any;

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
      name: name,
      surname: surname,
      telephoneNumber: telephoneNumber,
      email: email,
      address: address,
      password: password,
      confirmPassword: confirmPassword,
      profilePicture: profilePicture

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
      name: name,
      surname: surname,
      telephoneNumber: telephoneNumber,
      email: email,
      address: address,
      password: password,
      confirmPassword: confirmPassword,
      profilePicture: profilePicture

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
      name: name,
      surname: surname,
      telephoneNumber: telephoneNumber,
      email: email,
      address: address,
      password: password,
      confirmPassword: confirmPassword,
      profilePicture: profilePicture

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
      name: name,
      surname: surname,
      telephoneNumber: telephoneNumber,
      email: email,
      address: address,
      password: password,
      confirmPassword: confirmPassword,
      profilePicture: profilePicture

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
      name: name,
      surname: surname,
      telephoneNumber: telephoneNumber,
      email: email,
      address: address,
      password: password,
      confirmPassword: confirmPassword,
      profilePicture: profilePicture

    });

    spyOn(router, 'navigate').and.stub();

    component.createAccount();

    fixture.detectChanges();

    expect(router.navigate).not.toHaveBeenCalled();
    expect(component.formGroup.valid).toBeFalsy();
  });

  it('password is empty', async () => {
    let name = "proba";
    let surname = "";
    let telephoneNumber = "0608286030"
    let email = "email.e@email.com";
    let address = "Cara Lazara 38"
    let password = "";
    let confirmPassword = "pass123";
    let profilePicture = "";

    let router = fixture.debugElement.injector.get(Router);

    component.formGroup.setValue({
      name: name,
      surname: surname,
      telephoneNumber: telephoneNumber,
      email: email,
      address: address,
      password: password,
      confirmPassword: confirmPassword,
      profilePicture: profilePicture

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
      name: name,
      surname: surname,
      telephoneNumber: telephoneNumber,
      email: email,
      address: address,
      password: password,
      confirmPassword: confirmPassword,
      profilePicture: profilePicture

    });

    spyOn(router, 'navigate').and.stub();

    component.createAccount();

    fixture.detectChanges();

    expect(router.navigate).not.toHaveBeenCalled();
    expect(dialog.openDialogs.length).toBeTruthy();
  });

  it('Account is created successfully', async () => {
    let name = "Borivoje";
    let surname = "Musk";
    let telephoneNumber = "+38182349248"
    let email = "borivoje.musk@email.com";
    let address = "TESLA"
    let password = "Nekatamosifra123";
    let confirmPassword = "Nekatamosifra123";
    let profilePicture = "";

    let router = fixture.debugElement.injector.get(Router);
    let matDialog = fixture.debugElement.injector.get(MatDialog);
    let passengerService = fixture.debugElement.injector.get(PassengerService);

    component.formGroup.setValue({
      name: name,
      surname: surname,
      telephoneNumber: telephoneNumber,
      email: email,
      address: address,
      password: password,
      confirmPassword: confirmPassword,
      profilePicture: profilePicture

    });

    const passenger: Passenger = {
      name: "Borivoje",
      surname: "Musk",
      telephoneNumber: "+38182349248",
      email: "borivoje.musk@email.com",
      address: "TESLA",
      password: "Nekatamosifra123",
      profilePicture: ""
    }

    spyOn(router, 'navigate').and.stub();
    spyOn(passengerService, 'create').and.returnValue(of(passenger));

    component.createAccount();

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.formGroup.valid).toBeTruthy();
      expect(dialog.openDialogs.length).toBeTruthy();
      expect(passenger.name).toEqual(component.formGroup.controls['name'].value);
      expect(passenger.surname).toEqual(component.formGroup.controls['surname'].value);
      expect(passenger.telephoneNumber).toEqual(component.formGroup.controls['telephoneNumber'].value);
      expect(passenger.email).toEqual(component.formGroup.controls['email'].value);
      expect(passenger.address).toEqual(component.formGroup.controls['address'].value);
    })
  });
});
