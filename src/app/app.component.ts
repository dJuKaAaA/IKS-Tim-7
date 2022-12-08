import { Component, OnInit } from '@angular/core';
import { VehicleService } from './services/vehicle.service';
import Vehicle from './interfaces/Vehicle';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'IKS-Tim-7';

  ngOnInit(): void {
  }
}
