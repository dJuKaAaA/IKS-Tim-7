import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Route } from 'src/app/model/route.model';
import { MapComponent } from '../map/map.component';
import { Location } from 'src/app/model/location.model';
import { DriverCurrentLocation } from '../unregistered-home/driver-current-location.model';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TomTomGeolocationService } from 'src/app/services/tom-tom-geolocation.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-passenger-home',
  templateUrl: './passenger-home.component.html',
  styleUrls: ['./passenger-home.component.css']
})
export class PassengerHomeComponent implements OnInit, AfterViewInit {
  
  @ViewChild(MapComponent) mapComponent: MapComponent;
  
  rideDateControl: FormControl = new FormControl(new Date());
  rideTimeControl: FormControl = new FormControl("");
  
  driverLocations: Array<DriverCurrentLocation> = [];
  route: Route = new Route(
    new Location(NaN, NaN, ""),
    new Location(NaN, NaN, ""),
    NaN,
    NaN
  );

  settingDepartureOnClick: boolean = true;  // if false then the next click will set destination marker on map

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

  scheduleRide() {
    const rideDate: Date = this.rideDateControl.value;
    
    // rideTimeControl.value is format: HH:mm
    const hours: number = +this.rideTimeControl.value.split(":")[0];
    const minutes: number = +this.rideTimeControl.value.split(":")[1];
    rideDate.setHours(hours);
    rideDate.setMinutes(minutes);
    console.log(rideDate);
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

  updateRouteInfoOnClick(markerLocation: Location) {
    if (this.settingDepartureOnClick) {
      this.mapComponent.removeRoute(this.route);
      this.route = new Route(
        new Location(NaN, NaN, ""),
        new Location(NaN, NaN, ""),
        NaN,
        NaN
      );
      this.mapComponent.removeMarker(this.route.departure);
      this.route.departure = markerLocation;
      this.geoLocationService.reverseGeocode(markerLocation.latitude, markerLocation.longitude).subscribe((response) => {
        if (response.addresses.length > 0) {
          const address = response.addresses[0].address;
          let fullAddress: string = address.freeformAddress + ", " + address.country;
          this.route.departure.address = fullAddress;
        }
      });
    } else {
      this.mapComponent.removeMarker(this.route.destination);
      this.route.destination = markerLocation;
      this.geoLocationService.reverseGeocode(markerLocation.latitude, markerLocation.longitude).subscribe((response) => {
        if (response.addresses.length > 0) {
          const address = response.addresses[0].address
          let fullAddress: string = address.freeformAddress + ", " + address.country;
          this.route.destination.address = fullAddress;
        }
      });
      this.mapComponent.showRoute(this.route);
    }
    this.settingDepartureOnClick = !this.settingDepartureOnClick;

  }
  

}
