import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FavoriteLocation } from 'src/app/model/favorite-location.model';
import { RideRequest } from 'src/app/model/ride-request.model';
import { ScheduleTimeDialogComponent } from '../schedule-time-dialog/schedule-time-dialog.component';

@Component({
  selector: 'app-favorite-location-card',
  templateUrl: './favorite-location-card.component.html',
  styleUrls: ['./favorite-location-card.component.css']
})
export class FavoriteLocationCardComponent implements OnInit {

  @Input() favoriteLocation: FavoriteLocation;

  routeTableColumns: Array<string> = ["departure", "destination"];

  constructor(
    private matDialog: MatDialog
  ) { }

  ngOnInit() {

  }

  openScheduleTimeDialog() {
    const rideRequest: RideRequest = {
      scheduledTime: "",
      locations: this.favoriteLocation.locations,
      passengers: this.favoriteLocation.passengers,
      vehicleType: this.favoriteLocation.vehicleType,
      babyTransport: this.favoriteLocation.babyTransport,
      petTransport: this.favoriteLocation.petTransport
    }
    this.matDialog.open(ScheduleTimeDialogComponent, {
      data: {
        rideRequest: rideRequest
      }
    });
  }

}
