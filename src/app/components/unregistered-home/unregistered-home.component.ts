import { Component, NgModule } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unregistered-home',
  templateUrl: './unregistered-home.component.html',
  styleUrls: ['./unregistered-home.component.css']
})
export class UnregisteredHomeComponent {

  bgImagePath: string = "../../../assets/unregistered-home-bg-img.png"

  constructor(private router: Router) {

  }

  goToRegister(): void {
    this.router.navigate(["register"]);
  }

  goToMaps(): void {
    window.scrollTo(0,document.body.scrollHeight);
  }

}
