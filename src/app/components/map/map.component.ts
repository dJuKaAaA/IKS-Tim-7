import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { GMAPILocation } from 'src/app/model/gmapilocation.model';
import { GMAPIRoute } from 'src/app/model/gmapiroute.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  startingLatitude: number = 51.673858;
  startingLongitude: number = 7.815982;
  startingZoom: number = 10.0;
 
  // TODO: change this dummy data later
  @Input() markers: Array<GMAPILocation> = [
    {
      lat: 51.673858,
      lng: 7.815982,
      label: "A",
      draggable: false
    },
    {
      lat: 51.373858,
      lng: 7.215982,
      label: "B",
      draggable: false
    },
    {
      lat: 51.723858,
      lng: 7.895982,
      label: "C",
      draggable: false
    }
  ]

  @Input() routes: Array<GMAPIRoute> = [
    {
      origin: {
        lat: 51.673858,
        lng: 7.815982,
        label: "A",
        draggable: false
      },
      destination: {
        lat: 51.373858,
        lng: 7.215982,
        label: "B",
        draggable: false
      }
    }
  ]

  // potreban billing :(
  testGeocoding(): void {
    const address = 'Baldersgade 3B, 2200 Copenhagen, Denmark';
    let myApiKey: string = 'AIzaSyCV2ZilS9MYRgLzsQ0FnkNLxbeNYSKdtNI';

    fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${myApiKey}`)
    .then(resp => resp.json())
    .then((geocodingResult) => {
      console.log(geocodingResult);
    });
  }

  ngOnInit(): void {

  }

}
