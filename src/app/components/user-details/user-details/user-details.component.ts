import { Component, OnInit } from '@angular/core';
import { Passenger } from 'src/app/model/passenger.model';
import { PassengerService } from 'src/app/services/passenger.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  passenger: Passenger = {} as Passenger;

  constructor(private passengerService: PassengerService) {}
  ngOnInit(): void {
    this.passengerService
      .getPassenger(7)
      .subscribe((data) => (this.passenger = data));
  }
}
