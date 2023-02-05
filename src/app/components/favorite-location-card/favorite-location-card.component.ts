import { Component, Input, OnInit } from '@angular/core';
import { FavoriteLocation } from 'src/app/model/favorite-location.model';

@Component({
  selector: 'app-favorite-location-card',
  templateUrl: './favorite-location-card.component.html',
  styleUrls: ['./favorite-location-card.component.css']
})
export class FavoriteLocationCardComponent implements OnInit {

  @Input() favoriteLocation: FavoriteLocation;

  routeTableColumns: Array<string> = ["departure", "destination"];

  ngOnInit() {
    
  }

}
