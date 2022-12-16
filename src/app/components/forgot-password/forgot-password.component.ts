import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  email: string = "";

  constructor(private router: Router) {}

  backToHome() {
    this.router.navigate(['']);
  }

}
