import { AfterViewInit, Component, NgModule, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from 'src/app/model/location.model';
import { Route } from 'src/app/model/route.model';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-unregistered-home',
  templateUrl: './unregistered-home.component.html',
  styleUrls: ['./unregistered-home.component.css']
})
export class UnregisteredHomeComponent {

  @ViewChild(MapComponent) mapComponent: MapComponent;

  bgImagePath: string = "../../../assets/unregistered-home-bg-img.png"

  locations: Array<Location> = [];
  routes: Array<Route> = []

  startAddress: string = ""
  endAddress: string = ""

  constructor(private router: Router) {

  }

  goToRegister(): void {
    this.router.navigate(["register"]);
  }

  goToMaps(): void {
    window.scrollTo(0,document.body.scrollHeight);
  }

  showRouteForAddresses(): void {
    this.mapComponent.showRouteFromAddresses(this.startAddress, this.endAddress);
    this.goToMaps();
  }

  clearMap(): void {
    this.mapComponent.clearMap();
  }

  failSchedule() {
    alert("You need to be logged in to schedule a ride")
  }

}
