import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { GMAPILocation } from 'src/app/model/gmapilocation.model';
import { GMAPIRoute } from 'src/app/model/gmapiroute.model';
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

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  @Input() rideRoutes: Array<GGCJRoute> = [];
  @Input() rideLocations: Array<GGCJLocation> = [];
  @Input() startAddress: string = "";
  @Input() endAddress: string = "";

  @Input() startingLongitude: number = 19.16;
  @Input() startingLatitude: number = 42.5;
  @Input() startingZoom: number = 12.0;

  private map: any;
  private markers: Array<ttMap.Marker> = [];
  private routes: Array<ttService.Route> = [];

  private ttApiKey: string = 'urES86sMdjoeMbhSLu9EK3ksu0Jjpb91';

  constructor(private ttGeolocationService: TomTomGeolocationService) {}

  ngOnInit(): void {
    this.loadMap();
    this.show();
  }

  private getLocationFromAddress(address: string): GGCJLocation {
    let location: GGCJLocation = new GGCJLocation(NaN, NaN, {});
    this.ttGeolocationService.geolocate(address, this.ttApiKey).subscribe(responseObj => {
      const ttGeolocationResponse: TomTomGeolocationResponse = responseObj;
      if (ttGeolocationResponse.results.length != 0) {
        // for now, only the first element found will be shown 
        location = new GGCJLocation(
          ttGeolocationResponse.results[0].position.lon,
          ttGeolocationResponse.results[0].position.lat,
          ttGeolocationResponse.results[0].address);
        }
    });
    return location;

  }

  private makeRouteFromAddresses(): void {
    const isLocationValid = function(location: GGCJLocation): boolean {
      return (Number.isNaN(location.longitude) || Number.isNaN(location.latitude));
    }

    let startLocation: GGCJLocation = this.getLocationFromAddress(this.endAddress);
    let endLocation: GGCJLocation = this.getLocationFromAddress(this.endAddress);

    if (isLocationValid(startLocation) || isLocationValid(endLocation)) {
      alert("Invalid location")  // Temporary alert, TODO: Make it prettier
      return;
    }
    const route: GGCJRoute = new GGCJRoute(startLocation, endLocation);
    this.rideRoutes.push(route);
  }

  show() {
    this.showMarkers();
    this.showRoutes();
  }

  private showMarkers() {
    for (let location of this.rideLocations) {
      const marker: ttMap.Marker = new ttMap.Marker({draggable: false})
        .setLngLat([location.longitude, location.latitude])
        .addTo(this.map);
      this.markers.push(marker);
    }
  }

  private showRoutes(): void {
    for (let route of this.rideRoutes) {
      const routeOption: ttService.CalculateRouteOptions = {
        key: this.ttApiKey,
        locations: [
          [route.startPoint.longitude, route.startPoint.latitude],
          [route.endPoint.longitude, route.endPoint.latitude]
        ]
      }
      ttService.services.calculateRoute(routeOption).then(
        (routeData: any) => {
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
