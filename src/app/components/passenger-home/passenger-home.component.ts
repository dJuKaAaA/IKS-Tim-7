import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Route } from 'src/app/model/route.model';
import { MapComponent } from '../map/map.component';
import { Location } from 'src/app/model/location.model';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TomTomGeolocationService } from 'src/app/services/tom-tom-geolocation.service';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-passenger-home',
  templateUrl: './passenger-home.component.html',
  styleUrls: ['./passenger-home.component.css']
})
export class PassengerHomeComponent {

}
