import { Component } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

  lat: number = 50.0;
  lng: number = 12.0;
  zoom: number = 15.0;

  scheduleMessage() {
    alert("You need to be logged in for this feature")
  }

}
