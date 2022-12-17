import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as ttMap from '@tomtom-international/web-sdk-maps';
import * as ttService from '@tomtom-international/web-sdk-services';
import { TomTomGeolocationService } from 'src/app/services/tom-tom-geolocation.service';
import { TomTomGeolocationResponse } from 'src/app/model/tom-tom-geolocation-response.model';
import { Route as GGCJRoute } from 'src/app/model/route.model';
import { Location as GGCJLocation } from 'src/app/model/location.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

  ggcjRoutes: Array<GGCJRoute> = [];
  routeLayers: Array<tt.Layer> = [];
  markers: Array<tt.Marker> = []

  @Input() startingLongitude: number = 19.16;
  @Input() startingLatitude: number = 42.5;
  @Input() startingZoom: number = 12.0;

  @Output() routeEmitter: EventEmitter<GGCJRoute> = new EventEmitter<GGCJRoute>();

  notifyRoute(route: GGCJRoute) {
    this.routeEmitter.emit(route);
  }

  private flyToZoom: number = 15.0;

  private map: any;

  private ttApiKey: string = 'urES86sMdjoeMbhSLu9EK3ksu0Jjpb91';

  constructor(private ttGeolocationService: TomTomGeolocationService) {}

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
    this.ttGeolocationService.getGeocode(startAddress).subscribe(responseObj => {
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
      this.ttGeolocationService.getGeocode(endAddress).subscribe(responseObj => {
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
        const route: GGCJRoute = new GGCJRoute(startLocation, endLocation, NaN, NaN);
        if (this.checkRouteExists(route)) {
          alert("This route is already shown on the map");
        } else {
          this.ggcjRoutes.push(route);
          this.showRoute(route);

          // focus on the start point
          this.focusOnPoint(route.departure);
        }
      });
   });
  }

  public focusOnPoint(location: GGCJLocation) {
    this.map.flyTo({
      center: { lat: location.latitude, lon: location.longitude },
      zoom: this.flyToZoom
    });
  }

  public clearMap() {
    this.ggcjRoutes = [];
    this.map.remove();
    this.loadMap();
  }

  public showMarker(location: GGCJLocation, markerIconSrc: string = "") {
    if (markerIconSrc) {
      const markerElement = document.createElement('img');
      markerElement.style.width = "50px";
      markerElement.style.height = "50px";
      markerElement.src = markerIconSrc;
      const marker: ttMap.Marker = new ttMap.Marker({draggable: false, element: markerElement, offset: [0, 27]})
        .setLngLat([location.longitude, location.latitude])
        .addTo(this.map);
      this.markers.push(marker);
    } else {
      const marker: ttMap.Marker = new ttMap.Marker({draggable: false})
        .setLngLat([location.longitude, location.latitude])
        .addTo(this.map);
      this.markers.push(marker);
    }
  }

  public removeMarker(location: GGCJLocation) {
    this.markers.filter((marker) => {
      if (marker.getLngLat().lat == location.latitude && marker.getLngLat().lng == location.longitude) {
        marker.remove();
        return false;
      }
      return true;
    });
  }

  public updateMarkerLocation(markerLocation: GGCJLocation, newLocation: GGCJLocation) {
    for (let marker of this.markers) {
      if (marker.getLngLat().lat == markerLocation.latitude && marker.getLngLat().lng == markerLocation.longitude) {
        marker.setLngLat({ lat: newLocation.latitude, lng: newLocation.longitude });
        break;
      }
    }
  }

  private checkRouteExists(route: GGCJRoute) {
    let retVal: boolean = false;
    this.ggcjRoutes.forEach(element => {
      if (element.toString() == route.toString()){
        retVal = true;
        return;
      }
    });
    return retVal;
  }

  public showRoute(route: GGCJRoute): void {
    this.showMarker(route.departure);
    this.showMarker(route.destination);

    // showing route on map
    const routeOptions: ttService.CalculateRouteOptions = {  // TODO: change to CalculateReachableRouteOptions
      key: this.ttApiKey,
      locations: [
        [route.departure.longitude, route.departure.latitude],
        [route.destination.longitude, route.destination.latitude]
      ],
    }
    ttService.services.calculateRoute(routeOptions).then(
      (routeData: any) => {
        route.distanceInMeters = routeData.routes[0].summary.lengthInMeters;
        route.estimatedTimeInMinutes = Math.round(routeData.routes[0].summary.travelTimeInSeconds / 60);
        this.notifyRoute(route);
        let routeLayer: tt.Layer = {
          'id': route.toString(),
          'type': 'line',
          'source': {
            'type': 'geojson',
            'data': routeData.toGeoJson(),
          },
          'paint': {
            'line-color': 'red',
            'line-width': 5
          }
        };
        this.map.addLayer(routeLayer);
        this.routeLayers.push(routeLayer);
      }
    );
  }

  public removeRoute(route: GGCJRoute): void {
    this.routeLayers = this.routeLayers.filter((routeLayer) => {
      if (route.toString() == routeLayer.id) {
        this.map.removeLayer(routeLayer.id);
        this.removeMarker(route.departure);
        this.removeMarker(route.destination);
        return false;
      }
      return true;
    });
  }

  public loadMap(): void {
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
