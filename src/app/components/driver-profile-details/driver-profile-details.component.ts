import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Document } from 'src/app/model/document.model';
import { Driver } from 'src/app/model/driver.model';
import { Vehicle } from 'src/app/model/vehicle.model';
import { AuthService } from 'src/app/services/auth.service';
import { DriverService } from 'src/app/services/driver.service';

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
    private router: Router
  ) {}
  ngOnInit(): void {
    const userId = this.authService.getId();
    this.driverService.getDriver(userId).subscribe({
      next : driver =>{
        this.fillUpTheHTML(userId);
      },
      error : () => {
        if(this.driverId != 0){
          // console.log(this.driverId);
          this.fillUpTheHTML(this.driverId);
        }
      }
    })
  }

  fillUpTheHTML(userId : number){
    this.driverService
      .getDriver(userId)
      .subscribe((data) => (this.driver = data));
    this.driverService
      .getAvgDriverRating(userId)
      .then((res) => (this.driverRating = res));

    this.driverService
      .getAvgVehicleRating(userId)
      .then((res) => (this.vehicleRating = res));

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
        image: element.documentImage,
        thumbImage: element.documentImage,
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
