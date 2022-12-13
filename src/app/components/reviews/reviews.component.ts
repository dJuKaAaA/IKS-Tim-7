import { Component, Input, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { Driver } from 'src/app/model/driver.model';
import { Review } from 'src/app/model/review.model';
import { Ride } from 'src/app/model/ride.model';
import { Vehicle } from 'src/app/model/vehicle.model';
import { DriverService } from 'src/app/services/driver.service';
import { ReviewService } from 'src/app/services/review.service';
import { RideService } from 'src/app/services/ride.service';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
})
export class ReviewsComponent implements OnInit {
  @Input() public reviews: Review[];

  constructor() {}
  ngOnInit(): void {}
}
