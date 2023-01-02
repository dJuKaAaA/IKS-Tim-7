import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Ride } from 'src/app/model/ride.model';
import { Route } from 'src/app/model/route.model';
import { ChatDialogComponent } from '../chat-dialog/chat-dialog.component';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-passenger-current-ride',
  templateUrl: './passenger-current-ride.component.html',
  styleUrls: ['./passenger-current-ride.component.css']
})
export class PassengerCurrentRideComponent implements OnInit {

  @ViewChild(MapComponent) mapComponent: MapComponent;

  ride: Ride;

  constructor(private matDialog: MatDialog) {}

  ngOnInit(): void {
    this.mapComponent.loadMap();
  }

  ngAfterViewInit(): void {
    this.mapComponent.loadMap();
  }

  openChat() {
    this.matDialog.open(ChatDialogComponent);
  }

}
