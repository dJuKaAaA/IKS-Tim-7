import { Component, OnInit } from '@angular/core';
import { PassengerService } from 'app/services/passenger.service';

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.css']
})
export class ProfileFormComponent{
  constructor(private passengerService : PassengerService) {}
}
