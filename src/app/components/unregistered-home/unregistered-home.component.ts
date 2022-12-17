import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from 'src/app/model/location.model';
import { Route } from 'src/app/model/route.model';
import { MapComponent } from '../map/map.component';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';

@Component({
  selector: 'app-unregistered-home',
  templateUrl: './unregistered-home.component.html',
  styleUrls: ['./unregistered-home.component.css'],
  animations: [
    trigger('login-popup',[
      state('hidden', style({
        'opacity': '0'
      })),
      state('shown', style({
        'opacity': '100'
      })),
      transition('hidden => shown',animate(500)),
      transition('shown => hidden',animate(500))
    ])
  ]
})
export class UnregisteredHomeComponent implements OnInit, AfterViewInit {

  @ViewChild(MapComponent) mapComponent: MapComponent;

  bgImagePath: string = "src/assets/unregistered-home-bg-img.png"

  locations: Array<Location> = [];
  route: Route = new Route(
    new Location(NaN, NaN, ""),
    new Location(NaN, NaN, ""),
    NaN,
    NaN
  );

  startAddressControl: FormControl = new FormControl("");
  endAddressControl: FormControl = new FormControl("");

  constructor(private router: Router) {

  }
  
  ngOnInit(): void {
    this.mapComponent.loadMap();
  }

  ngAfterViewInit(): void {
    this.mapComponent.loadMap();
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
    this.mapComponent.removeRoute(this.route);
    this.mapComponent.showRouteFromAddresses(startAddress, endAddress);
    this.goToMaps();
  }

  loginPopupState: string = "hidden";

  showLoginPopup() {
    let loginPopup = document.getElementById("login-popup");
    if (loginPopup != null) {
      loginPopup.style.display = loginPopup.style.display == "none" ? "block" : "none";
    }
    this.loginPopupState = this.loginPopupState == "hidden" ? "shown" : "hidden";
  }

}
