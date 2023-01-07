import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as ttMap from '@tomtom-international/web-sdk-maps';
import * as ttService from '@tomtom-international/web-sdk-services';
import { TomTomGeolocationService } from 'src/app/services/tom-tom-geolocation.service';
import { TomTomGeolocationResponse } from 'src/app/model/tom-tom-geolocation-response.model';
import { Route as GGCJRoute } from 'src/app/model/route.model';
import { Location as GGCJLocation } from 'src/app/model/location.model';
import { environment } from 'src/environment/environment';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

  private markers: Array<ttMap.Marker> = []
  private routeLayers: Array<ttMap.Layer> = []

  @Input() startingLatitude: number = environment.startLatitude;
  @Input() startingLongitude: number = environment.startLongitude;
  @Input() startingZoom: number = environment.startZoom;
  @Input() clickCreatesMarker: boolean = false;

  @Output() routeEmitter: EventEmitter<GGCJRoute> = new EventEmitter<GGCJRoute>();
  @Output() onClickMarkerEmitter: EventEmitter<GGCJLocation> = new EventEmitter<GGCJLocation>();

  notifyRoute(route: GGCJRoute) {
    this.routeEmitter.emit(route);
  }

  private flyToZoom: number = 15.0;

  private map: any;

  constructor(private ttGeolocationService: TomTomGeolocationService, private matDialog: MatDialog) {}

  public showRouteFromAddresses(startAddress: string, endAddress: string): void {
    const isLocationValid = function(location: GGCJLocation): boolean {
      return (Number.isNaN(location.longitude) || Number.isNaN(location.latitude));
    }

    if (startAddress == "" || endAddress == "") {
      this.matDialog.open(DialogComponent, {
        data: {
          header: "Empty address!",
          body: "Address can't be empty"
        }
      });
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
          this.matDialog.open(DialogComponent, {
            data: {
              header: "Route not found!",
              body: "Could not find route based on the addresses"
            }
          });
          return;
        }
        
        // after validations, we show the route on the map
        const route: GGCJRoute = new GGCJRoute(startLocation, endLocation, NaN, NaN);
        if (this.checkRouteExists(route)) {
          this.matDialog.open(DialogComponent, {
            data: {
              header: "Already displayed!",
              body: "This route is already being displayed on the map"
            }
          });
        } else {
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
    this.markers = [];
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
      if (!this.clickCreatesMarker) {
        const popup = new ttMap.Popup({ anchor: 'bottom', offset: { bottom: [0, -40] } }).setText(location.address);        
        marker.setPopup(popup);
      }
      marker.addTo(this.map);
      this.markers.push(marker);
    }
  }

  public removeMarker(location: GGCJLocation) {
    this.markers = this.markers.filter((marker) => {
      if (marker.getLngLat().lat == location.latitude && marker.getLngLat().lng == location.longitude) {
        marker.remove();
        return false;
      }
      return true;
    });
  }

  public removeAllMarkers() {
    for (let marker of this.markers) {
      marker.remove();
    }
    this.markers = [];
  }

  public updateMarkerLocation(markerLocation: GGCJLocation, newLocation: GGCJLocation) {
    for (let marker of this.markers) {
      if (marker.getLngLat().lat == markerLocation.latitude && marker.getLngLat().lng == markerLocation.longitude) {
        marker.setLngLat({ lat: newLocation.latitude, lng: newLocation.longitude });
        break;
      }
    }
  }

  private getRouteAsString(route: GGCJRoute): string {
    return "(" + this.getLocationAsString(route.departure) + ", " + this.getLocationAsString(route.destination) + ")";
  }

  private getLocationAsString(location: GGCJLocation): string {
    return "[" + location.latitude + ", " + location.longitude + "]";;
  }

  private checkRouteExists(route: GGCJRoute): boolean {
    return this.map.getLayer(this.getRouteAsString(route))
  }

  public async showRoute(route: GGCJRoute, routeLineColor: string = 'red') {
    if (this.checkRouteExists(route)) {
      this.matDialog.open(DialogComponent, {
        data: {
          header: "Already displayed!",
          body: "This route is already being displayed on the map"
        }
      });
      this.focusOnPoint(route.departure);
      return;
    }
    
    this.showMarker(route.departure);
    this.showMarker(route.destination);

    // showing route on map
    const routeOptions: ttService.CalculateRouteOptions = {  // TODO: change to CalculateReachableRouteOptions
      key: environment.ttApiKey,
      locations: [
        [route.departure.longitude, route.departure.latitude],
        [route.destination.longitude, route.destination.latitude]
      ],
    }
    await ttService.services.calculateRoute(routeOptions).then(
      (routeData: any) => {
        route.distanceInMeters = routeData.routes[0].summary.lengthInMeters;
        route.estimatedTimeInMinutes = Math.round(routeData.routes[0].summary.travelTimeInSeconds / 60);
        this.notifyRoute(route);
        const routeLayer: ttMap.Layer = {
          'id': this.getRouteAsString(route),
          'type': 'line',
          'source': {
            'type': 'geojson',
            'data': routeData.toGeoJson(),
          },
          'paint': {
            'line-color': routeLineColor,
            'line-width': 5
          }
        };

        this.routeLayers.push(routeLayer);
        this.map.addLayer(routeLayer);
      }
    );
  }

  public removeRoute(route: GGCJRoute): void {
    if (this.checkRouteExists(route)) {
      this.routeLayers = this.routeLayers.filter((el) => {
        if (el.id == this.getRouteAsString(route)) {
          return false;
        }
        return true;
      })
      this.map.removeLayer(this.getRouteAsString(route));
      this.map.removeSource(this.getRouteAsString(route));
      this.removeMarker(route.departure);
      this.removeMarker(route.destination);
    }
  }

  public removeAllRouteLayers() {
    for (let routeLayer of this.routeLayers) {
      this.map.removeLayer(routeLayer.id);
      this.map.removeSource(routeLayer.id);
    }
    this.routeLayers = [];
  }

  public loadMap(): void {
    this.map = ttMap.map({
      key: environment.ttApiKey,
      container: 'map',
      center: [this.startingLongitude, this.startingLatitude],
      zoom: this.startingZoom
    });

    this.map.on("click", (element: any) => {
      if (this.clickCreatesMarker) {
        const markerLocation = new GGCJLocation(element.lngLat.lat, element.lngLat.lng, ""); 
        this.showMarker(markerLocation);
        this.onClickMarkerEmitter.emit(markerLocation);
      }
    })

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
