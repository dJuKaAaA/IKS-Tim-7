import { Component, OnInit, ViewChild } from '@angular/core';
import { Ride } from 'src/app/model/ride.model';
import { Route } from 'src/app/model/route.model';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-passenger-current-ride',
  templateUrl: './passenger-current-ride.component.html',
  styleUrls: ['./passenger-current-ride.component.css']
})
export class PassengerCurrentRideComponent implements OnInit {

  @ViewChild(MapComponent) mapComponent: MapComponent;

  ride: Ride;

  ngOnInit(): void {
    this.mapComponent.loadMap();
  }

  ngAfterViewInit(): void {
    this.mapComponent.loadMap();
  }

}
