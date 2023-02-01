import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginComponent } from './login.component';
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

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const token: any = {
    accessToken:
      'eyJhbGciOiJIUzUxMiJ9.eyJpc3MiOiJzcHJpbmctc2VjdXJpdHktZXhhbXBsZSIsInN1YiI6ImpvdmFuLmpvdmFub3ZpY0BlbWFpbC5jb20iLCJhdWQiOiJ3ZWIiLCJpYXQiOjE2NzUyMTc2ODIsImV4cCI6MTY3NTIxOTQ4Miwicm9sZXMiOlsiUk9MRV9QQVNTRU5HRVIiXSwiaWQiOjR9.vOeIhwkD69HFkAQYcQQ2qtMVO7rxfA5F_ZR4ymlCl9pP2cFghT4hB3NEyrp4kqPSAWfMrW4ooLrVu1_quxAjMw',
    refreshToken: '',
  };

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
      declarations: [LoginComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should passenger login', async () => {
    let passengerEmail: string = `passenger@email.com`;
    let passengerPassword: string = `passengerPassword`;

    let authService = fixture.debugElement.injector.get(AuthService);
    let router = fixture.debugElement.injector.get(Router);

    component.form.setValue({
      email: passengerEmail,
      password: passengerPassword,
    });

    spyOn(authService, 'login').and.returnValue(of(token));
    spyOn(authService, 'getRole').and.returnValue('ROLE_PASSENGER');
    spyOn(router, 'navigate').and.stub();

    component.login();

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(localStorage.getItem('user')).toBe(JSON.stringify(token));
      expect(router.navigate).toHaveBeenCalledWith(['passenger-home']);
    });
  });

  it('should admin login', async () => {
    let adminEmail: string = `admin@email.com`;
    let adminPassword: string = `adminPassword`;

    let authService = fixture.debugElement.injector.get(AuthService);
    let router = fixture.debugElement.injector.get(Router);

    component.form.setValue({
      email: adminEmail,
      password: adminPassword,
    });

    spyOn(authService, 'login').and.returnValue(of(token));
    spyOn(authService, 'getRole').and.returnValue('ROLE_ADMIN');
    spyOn(router, 'navigate').and.stub();

    component.login();

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(localStorage.getItem('user')).toBe(JSON.stringify(token));
      expect(router.navigate).toHaveBeenCalledWith(['admin-home']);
    });
  });

  it('should driver login', async () => {
    let adminEmail: string = `admin@email.com`;
    let adminPassword: string = `adminPassword`;

    let authService = fixture.debugElement.injector.get(AuthService);
    let driverService = fixture.debugElement.injector.get(DriverService);
    let router = fixture.debugElement.injector.get(Router);

    component.form.setValue({
      email: adminEmail,
      password: adminPassword,
    });

    let workHours: WorkHour = {
      start: '',
      end: '',
      id: 1,
    };

    spyOn(authService, 'login').and.returnValue(of(token));
    spyOn(authService, 'getRole').and.returnValue('ROLE_DRIVER');
    spyOn(authService, 'getId').and.returnValue(1);
    spyOn(driverService, 'startShift').and.returnValue(of(workHours));
    spyOn(router, 'navigate').and.stub();

    component.login();

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(localStorage.getItem('user')).toBe(JSON.stringify(token));
      expect(router.navigate).toHaveBeenCalledWith(['driver-home']);
    });
  });

  it('should be wrong login', async () => {
    let wrongEmail: string = `admin@email.com`;
    let password: string = `adminPassword`;

    let router = fixture.debugElement.injector.get(Router);
    let authService = fixture.debugElement.injector.get(AuthService);

    component.form.setValue({
      email: wrongEmail,
      password: password,
    });

    spyOn(router, 'navigate').and.stub();
    spyOn(authService, 'login').and.returnValue(
      throwError(
        new HttpErrorResponse({
          error: 'Invalid credentials',
          status: 401,
        })
      )
    );

    component.login();

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.hasError).toBeTruthy();
      expect(router.navigate).not.toHaveBeenCalled();

      const errorMessage = fixture.debugElement.query(By.css('mat-error'))
        .nativeElement.textContent;
      expect(errorMessage).toContain('Invalid email or password');
    });
  });

  it('login form should be invalid when both fields are empty', async () => {
    let wrongEmail: string = ``;
    let password: string = ``;

    component.form.setValue({
      email: wrongEmail,
      password: password,
    });

    let authService = fixture.debugElement.injector.get(AuthService);
    spyOn(authService, 'login').and.stub();

    fixture.detectChanges();
    component.form.markAsDirty();

    component.login();

    expect(component.form.valid).toBeFalsy();
    expect(authService.login).not.toHaveBeenCalled();
  });

  it('login form should be invalid when email is empty', async () => {
    let emptyEmail: string = ``;
    let password: string = `password`;

    component.form.setValue({
      email: emptyEmail,
      password: password,
    });

    let authService = fixture.debugElement.injector.get(AuthService);
    spyOn(authService, 'login').and.stub();

    fixture.detectChanges();
    component.form.markAsDirty();

    component.login();

    expect(component.form.valid).toBeFalsy();
    expect(authService.login).not.toHaveBeenCalled();
  });

  it('login form should be invalid when password is empty', async () => {
    let email: string = `someEmail@email.com`;
    let emptyPassword: string = ``;

    component.form.setValue({
      email: email,
      password: emptyPassword,
    });
    let authService = fixture.debugElement.injector.get(AuthService);
    spyOn(authService, 'login').and.stub();

    fixture.detectChanges();
    component.form.markAsDirty();

    component.login();

    expect(component.form.valid).toBeFalsy();
    expect(authService.login).not.toHaveBeenCalled();
  });
});
