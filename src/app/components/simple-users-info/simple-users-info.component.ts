import { Component, Input } from '@angular/core';
import { Passenger } from 'src/app/model/passenger.model';

@Component({
  selector: 'app-simple-users-info',
  templateUrl: './simple-users-info.component.html',
  styleUrls: ['./simple-users-info.component.css'],
})
export class SimpleUsersInfoComponent {
  @Input() passengers: Passenger[] = [];
}
