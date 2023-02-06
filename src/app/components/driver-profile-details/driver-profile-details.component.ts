import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Document } from 'src/app/model/document.model';
import { Driver } from 'src/app/model/driver.model';
import { Vehicle } from 'src/app/model/vehicle.model';
import { AuthService } from 'src/app/services/auth.service';
import { DriverService } from 'src/app/services/driver.service';
import { ImageParserService } from 'src/app/services/image-parser.service';

export interface SliderImage {
  image: String;
  thumbImage: String;
  title: String;
  alt: String;
}

@Component({
  selector: 'app-driver-profile-details',
  templateUrl: './driver-profile-details.component.html',
  styleUrls: ['./driver-profile-details.component.css'],
})
export class DriverProfileDetailsComponent implements OnInit {
  @Input() public driver: Driver = {} as Driver;
  @Input() public vehicle: Vehicle = {} as Vehicle;
  @Input() public documents: Document[] = [];

  @Input() public driverRating: number = 0;
  @Input() public vehicleRating: number = 0;

  @Input() public driverId: number = 0;

  @Input() public driverProfilePicture: String;

  imgSlider: boolean = false;
  profileInfo: boolean = true;
  vehicleDetails: boolean = false;

  imgCollection: Array<SliderImage> = [
    {
      image: 'https://loremflickr.com/g/600/400/paris',
      thumbImage: 'https://loremflickr.com/g/1200/800/paris',
      alt: 'Image 1',
      title: 'Image 1',
    },
  ];

  constructor(
    private driverService: DriverService,
    private authService: AuthService,
    private router: Router,
    private imageParserService: ImageParserService
  ) { }
  ngOnInit(): void {
    if (this.authService.getRole() == "ROLE_DRIVER") {
      const userId = this.authService.getId();
      this.driverService.getDriver(userId).subscribe({
        next: (driver) => {
          this.fillUpTheHTML(userId);
        }
      });
    }
  }

  fillUpTheHTML(userId: number) {
    this.driverService.getDriver(userId).subscribe((data) => {
      this.driver = data;
      this.driverProfilePicture = this.imageParserService.getImageUrl(
        this.driver.profilePicture
      );
      console.log(this.driverProfilePicture);
    });
    this.driverService
      .getAvgDriverRating(userId)
      .then((res) => (this.driverRating = Math.round(res)));

    this.driverService
      .getAvgVehicleRating(userId)
      .then((res) => (this.vehicleRating = Math.round(res)));

    this.driverService
      .getVehicle(userId)
      .subscribe((data) => (this.vehicle = data));

    this.driverService.getDocuments(userId).subscribe((data) => {
      this.documents = data;
      this.fillUpDocuments();
    });
  }

  fillUpDocuments() {
    this.documents.forEach((element) => {
      this.imgCollection.push({
        image: this.imageParserService.getImageUrl(
          element.documentImage as string
        ),
        thumbImage: this.imageParserService.getImageUrl(
          element.documentImage as string
        ),
        title: element.name,
        alt: element.name,
      });
    });
  }

  displayDocuments(): void {
    this.imgSlider = true;
    this.profileInfo = false;
  }

  hideSlideBar(): void {
    this.imgSlider = false;
    this.profileInfo = true;
  }

  displayVehicle(): void {
    this.profileInfo = false;
    this.vehicleDetails = true;
  }

  closeVehicle(): void {
    this.profileInfo = true;
    this.vehicleDetails = false;
  }

  // prosledjivanje iz komponente
  redirectToDriverEditProfile() {
    this.router.navigateByUrl('/driver-edit-profile');
  }
}
