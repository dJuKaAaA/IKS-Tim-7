import { Component, Input, OnInit } from '@angular/core';
import { Passenger } from 'src/app/model/passenger.model';
import { PassengerService } from 'src/app/services/passenger.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-passenger-profile-details',
  templateUrl: './passenger-profile-details.component.html',
  styleUrls: ['./passenger-profile-details.component.css'],
})
export class PassengerProfileDetailsComponent implements OnInit {
  public passenger: Passenger;
  @Input() passengerId:number;

  constructor(
    private passengerService: PassengerService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getId();
    console.log(this.passengerId);
    this.passengerService.getPassenger(userId).subscribe({
      next: data => {
        this.passenger = data;
      },
      error: () => {
        if(this.passengerId == -1) return;
        this.passengerService.getPassenger(this.passengerId).subscribe(data=>{this.passenger = data;})
      }
    });
  }
  redirectToPassengerEditProfile(): void {
    this.router.navigate(['passenger-profile']);
  }
}
