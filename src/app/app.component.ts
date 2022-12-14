import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { VehicleService } from './services/vehicle.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent{
  title = 'IKS-Tim-7';

  constructor(public authService: AuthService) {}
}
