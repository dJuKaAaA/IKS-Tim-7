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
    let surname = "";
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
    let surname = "";
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
    expect(dialog.openDialogs.lenght).toBeFalsy();
  });
});
