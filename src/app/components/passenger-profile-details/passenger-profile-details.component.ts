import { Component, OnInit } from '@angular/core';
import { Passenger } from 'src/app/model/passenger.model';
import { PassengerService } from 'src/app/services/passenger.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-passenger-profile-details',
  templateUrl: './passenger-profile-details.component.html',
  styleUrls: ['./passenger-profile-details.component.css'],
})
export class PassengerProfileDetailsComponent implements OnInit {
  public passenger: Passenger;

  constructor(
    private passengerService: PassengerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.passengerService.getPassenger(4).subscribe((data) => {
      this.passenger = data;
    });
  }
  redirectToPassengerEditProfile(): void {
    this.router.navigate(['passenger-profile']);
  }
}
