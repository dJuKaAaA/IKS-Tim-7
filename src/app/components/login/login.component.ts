import { HttpErrorResponse } from '@angular/common/http';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { WorkHour } from 'src/app/model/work-hours';
import { AuthService } from 'src/app/services/auth.service';
import { DateTimeService } from 'src/app/services/date-time.service';
import { DriverService } from 'src/app/services/driver.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required])
  })

  hasError: boolean = false;

  constructor(
    private router: Router, 
    private authService: AuthService,
    private driverService: DriverService,
    private dateTimeService: DateTimeService,
    private snackBar: MatSnackBar,
    private matDialog: MatDialog) {}

  login(): void {
    this.hasError = false;
    if (this.form.valid) {
      let email: string = this.form.value.email;
      let password: string = this.form.value.password;
      this.authService.login(email, password).subscribe({
        next: (result) => {
          localStorage.setItem('user', JSON.stringify(result));
          
          if (this.authService.getRole() == 'ROLE_PASSENGER') {
            this.router.navigate(['passenger-home']);
          } else if (this.authService.getRole() == 'ROLE_DRIVER') {
            const shiftStart = { start: this.dateTimeService.toString(new Date()) };
            this.driverService.startShift(this.authService.getId(), shiftStart).subscribe({
              next: (workHour: WorkHour) => {
                this.snackBar.open(`Shift started at '${workHour.start}'`, "Dismiss");
              }, error: (error) => {
                if (error instanceof HttpErrorResponse) {
                  this.matDialog.open(DialogComponent, {
                    data: {
                      header: "Error!",
                      body: error.error.message
                    }
                  });
                }
              }
            });
            this.router.navigate(['driver-home']);
          } else if (this.authService.getRole() == 'ROLE_ADMIN') {
            this.router.navigate(['admin-home']);
          }
        },
        error: (error) => {
          if (error instanceof HttpErrorResponse) {
            this.hasError = true;
          }
        },
      });

    }
  }

  forgotPasswordRedirect() {
    this.router.navigate(['forgot-password']);
  }
}
