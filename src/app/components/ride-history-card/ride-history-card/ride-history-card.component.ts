import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Ride } from 'src/app/model/ride.model';
import { Route } from './../../../model/route.model';

@Component({
  selector: 'app-ride-history-card',
  templateUrl: './ride-history-card.component.html',
  styleUrls: ['./ride-history-card.component.css'],
})
export class RideHistoryCardComponent implements OnInit {
  @Input() ride: Ride = {} as Ride;
  @Output() routeEvent = new EventEmitter();
  @Input() vehicleRating: number = 0;
  @Input() driverRating: number = 0;

  constructor() {}

  cardOnClick() {
    this.routeEvent.emit(this.ride);
  }
  ngOnInit(): void {}
}
