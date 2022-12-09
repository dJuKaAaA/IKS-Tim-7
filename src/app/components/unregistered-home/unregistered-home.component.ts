import { Component, NgModule } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from 'src/app/model/location.model';
import { Route } from 'src/app/model/route.model';

@Component({
  selector: 'app-unregistered-home',
  templateUrl: './unregistered-home.component.html',
  styleUrls: ['./unregistered-home.component.css']
})
export class UnregisteredHomeComponent {

  bgImagePath: string = "../../../assets/unregistered-home-bg-img.png"

  locations: Array<Location> = [
    new Location(45.24628246945485, 19.85170752737503, {}),
    new Location(45.245527089155075, 19.850516626557415, {}),
    new Location(45.246191824349225, 19.84923989505024, {}),
    new Location(45.25034547972879, 19.85242635939427, {})
  ];
  routes: Array<Route> = [
    new Route(
      new Location(45.24628246945485, 19.85170752737503, {}),
      new Location(45.256058433301284, 19.845757083194272, {})
    )
  ]

  constructor(private router: Router) {

  }

  goToRegister(): void {
    this.router.navigate(["register"]);
  }

  goToMaps(): void {
    window.scrollTo(0,document.body.scrollHeight);
  }

}
