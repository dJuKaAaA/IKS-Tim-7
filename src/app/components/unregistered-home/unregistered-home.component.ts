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
import { TomTomGeolocationService } from 'src/app/services/tom-tom-geolocation.service';

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
  routes: Array<Route> = [];

  settingInitialDepartureOnClick: boolean = true;  // if false then the next click will set destination marker on map
  disableStartAddressField = false;  // TODO: Rename

  startAddressControl: FormControl = new FormControl("");
  endAddressControl: FormControl = new FormControl("");

  constructor(private router: Router, private geoLocationService: TomTomGeolocationService) {

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

  updateRouteInfoOnClick(markerLocation: Location) {
    if (this.settingInitialDepartureOnClick) {
      this.mapComponent.removeRoute(this.route);
      this.route = new Route(
        new Location(NaN, NaN, ""),
        new Location(NaN, NaN, ""),
        NaN,
        NaN
      );
      this.mapComponent.removeMarker(this.route.departure);
      this.route.departure = markerLocation;
    } else {
      this.mapComponent.removeMarker(this.route.destination);
      this.mapComponent.showRoute(this.route);
    }
    this.settingInitialDepartureOnClick = !this.settingInitialDepartureOnClick;
    this.setFreeFormAddressOfLocation(markerLocation);
  }

  setFreeFormAddressOfLocation(location: Location) {
    this.geoLocationService.reverseGeocode(location.latitude, location.longitude);
    this.geoLocationService.reverseGeocode(location.latitude, location.longitude).subscribe((response) => {
      if (response.addresses.length > 0) {
        const address = response.addresses[0].address
        let fullAddress: string = address.freeformAddress + ", " + address.country;
        location.address = fullAddress;
      }
    });
  }

  async addMarkerOnClick(onClickLocation: Location) {
    await this.geoLocationService.
      reverseGeocode(onClickLocation.latitude, onClickLocation.longitude)
      .toPromise()
      .then((response) => {
        if (response.addresses.length > 0) {
          const address = response.addresses[0].address
          let fullAddress: string = address.freeformAddress + ", " + address.country;
          onClickLocation.address = fullAddress;
        }
      });

    if (this.settingInitialDepartureOnClick) {
      this.route.departure = onClickLocation;
      this.mapComponent.showMarker(this.route.departure);
      this.settingInitialDepartureOnClick = false;
      console.log("Initial marker placement...") 
      this.setFreeFormAddressOfLocation(onClickLocation);
    } else {
      this.route.destination = onClickLocation;
      this.mapComponent.showMarker(this.route.destination);
      this.mapComponent.showRoute(this.route);
      this.routes.push(this.cloneRoute(this.route));
      this.route.departure = this.route.destination;
      this.startAddressControl.setValue(this.route.departure.address);
      this.disableStartAddressField = true;
    }
  }

  private cloneRoute(route: Route): Route {  // TODO: Place this method somewhere more appropriate
    return new Route(
      new Location(route.departure.latitude, route.departure.longitude, route.departure.address),
      new Location(route.destination.latitude, route.destination.longitude, route.destination.address),
      route.distanceInMeters,
      route.estimatedTimeInMinutes
    );
  }

  totalDurationDisplay(): string {
    let duration: number = 0;
    for (let route of this.routes) {
      duration += route.estimatedTimeInMinutes || 0;
    }
    return `${duration} min`;
  }

  totalDistanceDisplay(): string {
    let distance: number = 0;
    for (let route of this.routes) {
      distance += route.distanceInMeters;
    }
    return `${distance}m`;
  }

}
