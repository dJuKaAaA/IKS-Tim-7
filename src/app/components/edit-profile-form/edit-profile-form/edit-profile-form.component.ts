import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() public displayDocumentsEvent = new EventEmitter();
  @Output() public changePasswordEvent = new EventEmitter();
  @Output() public updateProfileEventEmitter = new EventEmitter();
  notificationOffset: String = '-70px';
  successfully: Boolean = true;

  constructor() {}

  closeNotification(): void {
    this.notificationOffset = '-70px';
  }

  displayDocuments() {
    this.displayDocumentsEvent.emit();
  }

  changePassword() {
    this.changePasswordEvent.emit();
  }

  updateProfile() {
    this.updateProfileEventEmitter.emit();
  }
}
