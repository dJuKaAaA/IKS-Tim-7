import { HttpErrorResponse } from '@angular/common/http';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(private router: Router, private authService: AuthService) {}

  login(): void {
    if (this.form.valid) {
      let email: string = this.form.value.email;
      let password: string = this.form.value.password;
      this.authService.login(email, password).subscribe((response: any) => {
        localStorage.setItem('user', response.token);
        this.router.navigate(['driver-home']);
      });

    }
  }

  forgotPasswordRedirect() {
    this.router.navigate(['forgot-password']);
  }
}
