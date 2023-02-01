import { Component, Input, OnInit } from '@angular/core';
import { PassengerService } from 'src/app/services/passenger.service';
import { FormBuilder, NgForm } from '@angular/forms';
import { Passenger } from 'src/app/model/passenger.model';
import { ImageParserService } from 'src/app/services/image-parser.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent implements OnInit{

  passenger = {} as Passenger;
  message:String = ""
  succesfull : Boolean = true;
  public profilePicture:String;

  constructor(private passengerService : PassengerService, private imageParserService:ImageParserService, private authService:AuthService) {}

  ngOnInit(): void {
    const userId = this.authService.getId();
    this.passengerService.getPassenger(userId).subscribe({
      next: (data) => {
        this.passenger = data;
        this.profilePicture = this.imageParserService.getImageUrl(
          this.passenger.profilePicture
        );
      }
    });
  }

  onSubmit(f: NgForm): void {
    // Process checkout data here
    this.passengerService.updatePassenger(f).subscribe({
      next: () => {
        this.message = "Data succesfully updated";
      },
      error: () => {
        this.message = "An error occured";
      }
    });
  }

  onProfileImageSelected(event: any): void {
    let newProfileImage: File;
    if (event.target.files) {
      newProfileImage = event.target.files[0];
      this.imageParserService
        .convertToBase64(newProfileImage)
        .subscribe((img) => {
          this.profilePicture = img;
          this.passenger.profilePicture = this.imageParserService.removeBase64FromImage(
            img as string
          );
        });
    }
  }
}
