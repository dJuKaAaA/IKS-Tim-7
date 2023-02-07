import { Component, Input, OnInit } from '@angular/core';
import { Passenger } from 'src/app/model/passenger.model';
import { PassengerService } from 'src/app/services/passenger.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ImageParserService } from 'src/app/services/image-parser.service';

@Component({
  selector: 'app-passenger-profile-details',
  templateUrl: './passenger-profile-details.component.html',
  styleUrls: ['./passenger-profile-details.component.css'],
})
export class PassengerProfileDetailsComponent implements OnInit {
  @Input() public passenger: Passenger;
  public profilePicture: String;

  @Input() passengerId: number = -1;

  constructor(
    private passengerService: PassengerService,
    private authService: AuthService,
    private router: Router,
    private imageParserService: ImageParserService
  ) {}

  ngOnInit(): void {
    const userId = this.authService.getId();
    console.log(this.passengerId);
    this.passengerService.getPassenger(userId).subscribe({
      next: (data) => {
        this.passenger = data;
        this.profilePicture = this.imageParserService.getImageUrl(
          this.passenger.profilePicture
        );
      },
      error: () => {
        if (this.passengerId == -1) return;
        this.setData();
      },
    });
  }
  redirectToPassengerEditProfile(): void {
    this.router.navigate(['editProfile']);
  }

  setData(){
    if(this.passengerId != -1)
    this.passengerService
          .getPassenger(this.passengerId)
          .subscribe((data) => {
            this.passenger = data;
            this.profilePicture = this.imageParserService.getImageUrl(this.passenger.profilePicture);
          });
  }
}
