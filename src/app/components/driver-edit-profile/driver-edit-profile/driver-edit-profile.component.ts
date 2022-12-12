import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Document } from 'src/app/model/document.model';
import { Driver } from 'src/app/model/driver.model';
import { DriverService } from 'src/app/services/driver.service';

export interface SliderImage {
  image: String;
  thumbImage: String;
  title: String;
  alt: String;
}

@Component({
  selector: 'app-driver-edit-profile',
  templateUrl: './driver-edit-profile.component.html',
  styleUrls: ['./driver-edit-profile.component.css'],
})
export class DriverEditProfileComponent implements OnInit {
  imgSlider: boolean = false;
  profileInfo: boolean = true;
  imgCollection: Array<SliderImage> = [
    {
      image: 'https://loremflickr.com/g/600/400/paris',
      thumbImage: 'https://loremflickr.com/g/1200/800/paris',
      alt: 'Image 1',
      title: 'Image 1',
    },
    {
      image: 'https://loremflickr.com/600/400/brazil,rio',
      thumbImage: 'https://loremflickr.com/1200/800/brazil,rio',
      title: 'Image 2',
      alt: 'Image 2',
    },
    {
      image: 'https://loremflickr.com/600/400/paris,girl/all',
      thumbImage: 'https://loremflickr.com/1200/800/brazil,rio',
      title: 'Image 3',
      alt: 'Image 3',
    },
    {
      image: 'https://loremflickr.com/600/400/brazil,rio',
      thumbImage: 'https://loremflickr.com/1200/800/brazil,rio',
      title: 'Image 4',
      alt: 'Image 4',
    },
    {
      image: 'https://loremflickr.com/600/400/paris,girl/all',
      thumbImage: 'https://loremflickr.com/1200/800/paris,girl/all',
      title: 'Image 5',
      alt: 'Image 5',
    },
  ];
  public driver: Driver;
  public documents: Document[];
  constructor(private driverService: DriverService, private router: Router) {}
  ngOnInit(): void {
    // Kada prosledimo iz komponente
    this.driver = history.state.driver;
    this.documents = history.state.documents;

    this.driverService.getDriver(1).subscribe((data) => (this.driver = data));
    this.driverService.getDocuments(1).subscribe((data) => {
      this.documents = data;
      this.documents.forEach((element) => {
        this.imgCollection.push({
          image: element.documentImage,
          thumbImage: element.documentImage,
          title: element.name,
          alt: element.name,
        });
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

  changePassword(): void {
    // this.router.navigateByUrl('/driver-edit-profile', {
    //   state: { driver: this.driver, documents: this.documents },
    // });
  }
  uploadDocument(): void {}
  deleteDocument(): void {}
}
