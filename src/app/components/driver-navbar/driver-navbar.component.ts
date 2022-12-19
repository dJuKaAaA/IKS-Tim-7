import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environment/environment';

const ACTIVE: string = "ACTIVE";
const INACTIVE: string = "INACTIVE";

@Component({
  selector: 'app-driver-navbar',
  templateUrl: './driver-navbar.component.html',
  styleUrls: ['./driver-navbar.component.css']
})
export class DriverNavbarComponent {

  @ViewChild('activeTextContainer') activeTextContainer: ElementRef;

  taxiIcon: string = environment.taxiIcon;
  activeState: boolean = false;
  activeText: string = INACTIVE;

  constructor(private renderer: Renderer2, private router: Router, private authService: AuthService) {}

  changeActiveState() {
    this.activeState = !this.activeState;
    this.activeText = this.activeState ? ACTIVE : INACTIVE;
    let color: string = this.activeState ? "rgb(0, 128, 0)" : "rgb(128, 0, 0)";
    this.renderer.setStyle(
      this.activeTextContainer.nativeElement,
      'color',
      color
    )
  }

  logout() {
    this.authService.logout().subscribe((response) => {
      localStorage.removeItem('user');
      this.router.navigate(['']);
    })
  }

  navigateToHome() {
    this.router.navigate(['driver-home'])
  }

  navigateToRideHistory() {
    this.router.navigate(['userRideHistory'])
  }

  navigateToProfileInfo() {
    this.router.navigate(['driver-profile'])
  }

}
