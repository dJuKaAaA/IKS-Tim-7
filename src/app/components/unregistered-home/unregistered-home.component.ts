import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { environment } from 'src/environment/environment';
import { MatDialog } from '@angular/material/dialog';
import { ScheduleRideComponent } from '../schedule-ride/schedule-ride.component';

const ANIMATION_TIME = 500;
const LOGIN_HIDDEN_STATE = "hidden";
const LOGIN_SHOWN_STATE = "shown";

@Component({
  selector: 'app-unregistered-home',
  templateUrl: './unregistered-home.component.html',
  styleUrls: ['./unregistered-home.component.css'],
  animations: [
    trigger('login-popup',[
      state(LOGIN_HIDDEN_STATE, style({
        'opacity': '0'
      })),
      state(LOGIN_SHOWN_STATE, style({
        'opacity': '100'
      })),
      transition(`${LOGIN_HIDDEN_STATE} => ${LOGIN_SHOWN_STATE}`,animate(ANIMATION_TIME)),
      transition(`${LOGIN_SHOWN_STATE} => ${LOGIN_HIDDEN_STATE}`,animate(ANIMATION_TIME))
    ])
  ]
})
export class UnregisteredHomeComponent {

  @ViewChild(ScheduleRideComponent) scheduleRideComponent: ScheduleRideComponent;

  bgImagePath: string = environment.unregisteredUserHomePageBgImage;

  startAddressControl: FormControl = new FormControl("");
  endAddressControl: FormControl = new FormControl("");

  disableUpperFormStartAddressField: boolean = false;

  constructor(private router: Router, private matDialog: MatDialog) {

  }

  loginPopupState: string = LOGIN_HIDDEN_STATE;

  showLoginPopup() {
    let loginPopup = document.getElementById("login-popup");
    if (loginPopup != null) {
      loginPopup.style.display = loginPopup.style.display == "none" ? "block" : "none";
    }
    this.loginPopupState = this.loginPopupState == LOGIN_HIDDEN_STATE ? LOGIN_SHOWN_STATE : LOGIN_HIDDEN_STATE;
  }

  goToRegister(): void {
    this.router.navigate(["register"]);
  }

  goToMaps(): void {
    window.scrollTo(0, document.body.scrollHeight);
  }

  updateStartAddressAccess(disabled: boolean) {
    this.disableUpperFormStartAddressField = disabled;
  }

  showRouteRequestFromUpperForm() {
    this.goToMaps();
    this.scheduleRideComponent.showRouteFromAddresses();
  }

}
