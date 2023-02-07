import { Component, OnInit } from '@angular/core';
import { FavoriteLocation } from 'src/app/model/favorite-location.model';
import { AuthService } from 'src/app/services/auth.service';
import { RideService } from 'src/app/services/ride.service';

@Component({
  selector: 'app-favorite-locations',
  templateUrl: './favorite-locations.component.html',
  styleUrls: ['./favorite-locations.component.css']
})
export class FavoriteLocationsComponent implements OnInit {

  favoriteLocations: Array<FavoriteLocation> = [];

  constructor(
    private rideService: RideService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.rideService.getFavoriteLocationsByPassengerId(this.authService.getId()).subscribe(
      (response: Array<FavoriteLocation>) => {
        this.favoriteLocations = response;
      }
    )
  }



}
