import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  route: Route = new Route(
    new Location(NaN, NaN, ""),
    new Location(NaN, NaN, ""),
    0
  );

  startAddressControl: FormControl = new FormControl("");
  endAddressControl: FormControl = new FormControl("");

  constructor(private router: Router) {

  }

  goToRegister(): void {
    this.router.navigate(["register"]);
  }

  updateRoute(route: Route) {
    this.route = route;
  }

  goToMaps(): void {
    window.scrollTo(0,document.body.scrollHeight);
  }

  showRoute() {
    let startAddress = this.startAddressControl.value || "";
    let endAddress = this.endAddressControl.value || "";
    this.mapComponent.clearMap();
    this.mapComponent.showRouteFromAddresses(startAddress, endAddress);
    this.goToMaps();
  }

}
