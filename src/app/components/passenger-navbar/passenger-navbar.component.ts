import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-passenger-navbar',
  templateUrl: './passenger-navbar.component.html',
  styleUrls: ['./passenger-navbar.component.css']
})
export class PassengerNavbarComponent {

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['']);
  }

  navigateToHome() {
    this.router.navigate(['passenger-home'])
  }

  navigateToRideHistory() {
    this.router.navigate(['userRideHistory'])
  }

  navigateToProfileInfo() {
    this.router.navigate(['passenger-profile'])
  }

}
