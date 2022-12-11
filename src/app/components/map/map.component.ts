import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OnInit } from '@angular/core';
import * as ttMap from '@tomtom-international/web-sdk-maps';
import * as ttService from '@tomtom-international/web-sdk-services';
import { Observable } from 'rxjs';
import { Subscriber } from 'rxjs';
import * as mapboxgl from 'mapbox-gl';
import { HttpClient } from '@angular/common/http';
import { TomTomGeolocationService } from 'src/app/services/tom-tom-geolocation.service';
import { TomTomGeolocationResponse } from 'src/app/model/tom-tom-geolocation-response.model';
import { Route as GGCJRoute } from 'src/app/model/route.model';
import { Location as GGCJLocation } from 'src/app/model/location.model';
import { RouterTestingModule } from '@angular/router/testing';
import * as tt from '@tomtom-international/web-sdk-maps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @Input() rideLocations: Array<GGCJLocation> = [];
  @Input() rideRoutes: Array<GGCJRoute> = [];

  @Input() startingLongitude: number = 19.16;
  @Input() startingLatitude: number = 42.5;
  @Input() startingZoom: number = 12.0;

  @Output() rideLocationsEvent: EventEmitter<Array<GGCJLocation>> = new EventEmitter<Array<GGCJLocation>>;
  @Output() rideRoutesEvent: EventEmitter<Array<GGCJRoute>> = new EventEmitter<Array<GGCJRoute>>;

  notifyRideLocationsUpdate() { this.rideLocationsEvent.emit(this.rideLocations); }

  notifyRideRoutesUpdate() { this.rideRoutesEvent.emit(this.rideRoutes); }

  private flyToZoom: number = 15.0;

  private map: any;
  private markers: Array<ttMap.Marker> = [];
  private routes: Array<ttService.Route> = [];

  private ttApiKey: string = 'urES86sMdjoeMbhSLu9EK3ksu0Jjpb91';

  constructor(private ttGeolocationService: TomTomGeolocationService) {}

  ngOnInit(): void {
    this.loadMap();
    this.show();
  }

  private appendRideRoute(route: GGCJRoute) {
    this.rideRoutes.push(route);
    this.notifyRideRoutesUpdate();
  }

  private appendRideLocation(location: GGCJLocation) {
    this.rideLocations.push(location);
    this.notifyRideLocationsUpdate();
  }

  public showRouteFromAddresses(startAddress: string, endAddress: string): void {
    const isLocationValid = function(location: GGCJLocation): boolean {
      return (Number.isNaN(location.longitude) || Number.isNaN(location.latitude));
    }

    if (startAddress == "" || endAddress == "") {
      alert("Address field cannot be empty");
      return;
    }

    let startLocation: GGCJLocation = new GGCJLocation(NaN, NaN, "");
    let endLocation: GGCJLocation = new GGCJLocation(NaN, NaN, "");

    // getting the start address
    this.ttGeolocationService.geolocate(startAddress, this.ttApiKey).subscribe(responseObj => {
      const ttGeolocationResponse: TomTomGeolocationResponse = responseObj;
      if (ttGeolocationResponse.results.length != 0) {
        // for now, only the first element found will be shown
        const address: string = ttGeolocationResponse.results[0].address.freeformAddress + ", " + ttGeolocationResponse.results[0].address.country;
        startLocation = new GGCJLocation(
          ttGeolocationResponse.results[0].position.lat,
          ttGeolocationResponse.results[0].position.lon,
          address);
      }

      // after getting the start address we get the end address 
      // by nesting the end address request into start address request
      this.ttGeolocationService.geolocate(endAddress, this.ttApiKey).subscribe(responseObj => {
        const ttGeolocationResponse: TomTomGeolocationResponse = responseObj;
        if (ttGeolocationResponse.results.length != 0) {
          // for now, only the first element found will be shown
          const address: string = ttGeolocationResponse.results[0].address.freeformAddress + ", " + ttGeolocationResponse.results[0].address.country;
          endLocation = new GGCJLocation(
            ttGeolocationResponse.results[0].position.lat,
            ttGeolocationResponse.results[0].position.lon,
            address);
        }

        // after sending the requests, we check to see if the requests found the locations
        if (isLocationValid(startLocation) || isLocationValid(endLocation)) {
          alert("Location(s) not found")  // Temporary alert, TODO: Make it prettier
          return;
        }

        // after validations, we show the route on the map
        const route: GGCJRoute = new GGCJRoute(startLocation, endLocation);
        if (this.checkRouteExists(route)) {
          alert("This route is already shown on the map");
        } else {
          this.appendRideRoute(route);
          this.notifyRideRoutesUpdate();
          this.showRoute(route);

          // focus on the start point
          this.map.flyTo({
            center: { lat: route.startPoint.latitude, lon: route.startPoint.longitude },
            zoom: this.flyToZoom
          });
        }
      });

   });

  }

  public clearMap() {
    this.markers = [];
    this.routes = [];
    this.rideLocations = [];
    this.rideRoutes = [];
    this.map.remove();
    this.loadMap();
  }

  public show() {
    this.showAllMarkers();
    this.showAllRoutes();
  }

  private showAllMarkers() {
    for (let location of this.rideLocations) {
      this.showMarker(location);
    }
  }

  private showMarker(location: GGCJLocation) {
    const marker: ttMap.Marker = new ttMap.Marker({draggable: false})
      .setLngLat([location.longitude, location.latitude])
      .addTo(this.map);
    this.markers.push(marker);
  }

  private showAllRoutes(): void {
    for (let route of this.rideRoutes) {
      // creating markers for route display
      this.showRoute(route);
    }
  }

  private checkRouteExists(route: GGCJRoute) {
    let retVal: boolean = false;
    this.rideRoutes.forEach(element => {
      console.log(element);
      if (element.toString() == route.toString()){
        retVal = true;
        return;
      }
    });
    return retVal;
  }

  private showRoute(route: GGCJRoute): void {
    console.log(this.rideRoutes);
    this.showMarker(route.startPoint);
    this.showMarker(route.endPoint);

    // showing route on map
    const routeOptions: ttService.CalculateRouteOptions = {
      key: this.ttApiKey,
      locations: [
        [route.startPoint.longitude, route.startPoint.latitude],
        [route.endPoint.longitude, route.endPoint.latitude]
      ]
    }
    ttService.services.calculateRoute(routeOptions).then(
      (routeData: any) => {
        route.distanceInMeters = routeData.routes[0].summary.lengthInMeters;
        let routeLayer = this.map.addLayer({
          'id': 'route ' + route.toString(),
          'type': 'line',
          'source': {
            'type': 'geojson',
            'data': routeData.toGeoJson(),
          },
          'paint': {
            'line-color': 'red',
            'line-width': 5
          }
        });
        this.routes.push(routeLayer);
      }
    );
  }

  private loadMap(): void {
    this.map = ttMap.map({
      key: this.ttApiKey,
      container: 'map',
      center: [this.startingLongitude, this.startingLatitude],
      zoom: this.startingZoom
    });

    this.map.addControl(new ttMap.FullscreenControl());
    this.map.addControl(new ttMap.NavigationControl());

    // getting current position and setting map focus on it
    // this.ttGeolocationService.getCurrentPosition()
    //   .subscribe((position: any) => {
    //     this.map.flyTo({
    //     center: {
    //       lat: position.latitude,
    //       lng: position.longitude,
    //     },
    //     zoom: this.startingZoom,
    //   });

    //   // creating and setting popup for marker
    //   const popup = new tt.Popup({ anchor: 'bottom', offset: { bottom: [0, -40] } }).setHTML('Angular TomTom');
  
    //   var marker = new tt.Marker().setLngLat({
    //     lat: 37.7749,
    //     lng: -122.4194,
    //   })
    //     .addTo(this.map);
    //   marker.setPopup(popup).togglePopup();
    // });
  }

}
