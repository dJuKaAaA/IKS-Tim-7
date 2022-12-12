import { Component } from '@angular/core';
import { Driver } from 'src/app/model/driver.model';
import { DriverService } from 'src/app/services/driver.service';
import { UserDetailsComponent } from '../../user-details/user-details/user-details.component';

@Component({
  selector: 'app-driver-edit-profile',
  templateUrl: './driver-edit-profile.component.html',
  styleUrls: ['./driver-edit-profile.component.css'],
})
export class DriverEditProfileComponent {
  public driver: Driver;
  constructor(private driverService: DriverService) {
    driverService.getDriver(1).subscribe((data) => (this.driver = data));
  }
}
