import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VehicleDTO } from 'src/app/model/vehicle-dto';
import { VehicleType } from 'src/app/model/vehicle-type';
import { Vehicle } from 'src/app/model/vehicle.model';
import { VehicleTypeService } from 'src/app/services/vehicle-type.service';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-vehicle-creation-page',
  templateUrl: './vehicle-creation-page.component.html',
  styleUrls: ['./vehicle-creation-page.component.css']
})
export class VehicleCreationPageComponent{
}
