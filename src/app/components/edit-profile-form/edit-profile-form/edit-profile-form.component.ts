import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Driver } from 'src/app/model/driver.model';
import { Passenger } from 'src/app/model/passenger.model';

@Component({
  selector: 'app-edit-profile-form',
  templateUrl: './edit-profile-form.component.html',
  styleUrls: ['./edit-profile-form.component.css'],
})
export class EditProfileFormComponent {
  @Input() public user: Passenger | Driver;
  @Input() public displayDriverUI: boolean = false;
  notificationOffset: String = '-70px';
  successfully: Boolean = true;

  constructor() {}

  onSubmit(f: NgForm): void {
    // Process checkout data here
    this.notificationOffset = '30px';
    setTimeout(() => {
      this.notificationOffset = '-70px';
    }, 3000);
  }

  closeNotification(): void {
    this.notificationOffset = '-70px';
  }
}
