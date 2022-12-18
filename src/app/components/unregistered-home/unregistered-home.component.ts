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
import { DriverCurrentLocation } from './driver-current-location.model';
import { environment } from 'src/environment/environment';

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
export class UnregisteredHomeComponent implements OnInit, AfterViewInit {

  @ViewChild(MapComponent) mapComponent: MapComponent;

  bgImagePath: string = environment.unregisteredUserHomePageBgImage;
  
  driverLocations: Array<DriverCurrentLocation> = [];
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
    this.driverLocations.push({
      driverId: 1,
      location: new Location(45.2541486, 19.8187217, ""),
      isActive: true
    });
    this.driverLocations.push({
      driverId: 1,
      location: new Location(45.2473693, 19.8187955, ""),
      isActive: false
    });
    this.driverLocations.push({
      driverId: 1,
      location: new Location(45.2558923, 19.8436113, ""),
      isActive: false
    });
    this.driverLocations.push({
      driverId: 1,
      location: new Location(45.2472827, 19.8433833, ""),
      isActive: true
    });
    this.driverLocations.push({
      driverId: 1,
      location: new Location(45.2450728, 19.8408995, ""),
      isActive: false
    });
    this.driverLocations.push({
      driverId: 1,
      location: new Location(45.2445776, 19.8449582, ""),
      isActive: false
    })

    this.mapComponent.loadMap();
  }

  ngAfterViewInit(): void {
    this.mapComponent.loadMap();
    for (let location of this.driverLocations) {
      let carIconSrc = location.isActive ? environment.activeDriverMarker : environment.inactiveDriverMarker;
      this.mapComponent.showMarker(location.location, carIconSrc);
    }
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

  loginPopupState: string = LOGIN_HIDDEN_STATE;

  showLoginPopup() {
    let loginPopup = document.getElementById("login-popup");
    if (loginPopup != null) {
      loginPopup.style.display = loginPopup.style.display == "none" ? "block" : "none";
    }
    this.loginPopupState = this.loginPopupState == LOGIN_HIDDEN_STATE ? LOGIN_SHOWN_STATE : LOGIN_HIDDEN_STATE;
  }

}
