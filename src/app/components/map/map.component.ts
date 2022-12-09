import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { GMAPILocation } from 'src/app/model/gmapilocation.model';
import { GMAPIRoute } from 'src/app/model/gmapiroute.model';
import * as tt from '@tomtom-international/web-sdk-maps';
import * as tt2 from '@tomtom-international/web-sdk-services';
import { Observable } from 'rxjs';
import { Subscriber } from 'rxjs';
import * as mapboxgl from 'mapbox-gl';
import { HttpClient } from '@angular/common/http';
import { TomTomGeolocationService } from 'src/app/services/tom-tom-geolocation.service';
import { TomTomGeolocationResponse } from 'src/app/model/tom-tom-geolocation-response.model';
import { Route as GGCJRoute } from 'src/app/model/route.model';
import { Location as GGCJLocation } from 'src/app/model/location.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  rideRoutes: Array<GGCJRoute> = [];
  locationMarkers: Array<GGCJLocation> = [];
  startAddress: string = "";
  endAddress: string = "";

  map: any;  
  private markers: Array<tt.Marker> = [];
  private routes: Array<tt2.Route> = [];

  private ttApiKey: string = 'urES86sMdjoeMbhSLu9EK3ksu0Jjpb91';

  startingLongitude: number = 19.16;
  startingLatitude: number = 42.5;
  startingZoom: number = 12.0;

  constructor(private ttGeolocationService: TomTomGeolocationService) {}

  ngOnInit(): void {
    this.loadMap();

    // creating markers
    const marker1: tt.Marker = new tt.Marker({draggable: true})
      .setLngLat([this.startingLongitude, this.startingLatitude])
      .addTo(this.map);
    this.markers.push(marker1);

    const marker2: tt.Marker = new tt.Marker({draggable: true})
      .setLngLat([this.startingLongitude, this.startingLatitude - 0.01])
      .addTo(this.map);
    this.markers.push(marker2);

  }

  getLocationFromAddress(address: string): GGCJLocation {
    let location: GGCJLocation = {
      longitude: NaN,
      latitude: NaN
    };
    this.ttGeolocationService.geolocate(address, this.ttApiKey).subscribe(responseObj => {
      const ttGeolocationResponse: TomTomGeolocationResponse = responseObj;
      if (ttGeolocationResponse.results.length != 0) {
        location = {
          longitude: ttGeolocationResponse.results[0].position.lon,
          latitude: ttGeolocationResponse.results[0].position.lat,
          address: ttGeolocationResponse.results[0].address
        }
      }
    });
    return location;
  }

  makeRouteFromAddresses(): void {
    const isLocationValid = function(location: GGCJLocation): boolean {
      return (Number.isNaN(location.longitude) || Number.isNaN(location.latitude));
    }

    let startLocation: GGCJLocation = this.getLocationFromAddress(this.endAddress);
    let endLocation: GGCJLocation = this.getLocationFromAddress(this.endAddress);

    if (isLocationValid(startLocation) || isLocationValid(endLocation)) {
      alert("Invalid location")  // Temporary alert, TODO: Make it prettier
      return;
    }

  }

  findLocationFromAddress() {

  }

  showRoutes(): void {

  }

  drawRoute(): void {

    // showing route on map
    const marker1 = this.markers[0];
    const marker2 = this.markers[1];
    const routeOptions: tt2.CalculateRouteOptions = {
      key: this.ttApiKey,
      locations: [marker1.getLngLat(), marker2.getLngLat()]
    }
    tt2.services.calculateRoute(routeOptions).then(
      (routeData: any) => {
        console.log(routeData.toGeoJson());
        let routeLayer = this.map.addLayer({
          'id': 'route ' + marker1.getLngLat() + ' ' + marker2.getLngLat(),
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
    this.map = tt.map({
      key: this.ttApiKey,
      container: 'map',
      center: [this.startingLongitude, this.startingLatitude],
      zoom: this.startingZoom
    });

    this.map.addControl(new tt.FullscreenControl());
    this.map.addControl(new tt.NavigationControl());

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
