import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Vehicle } from 'src/app/model/vehicle.model';

@Component({
  selector: 'app-vehicle-info',
  templateUrl: './vehicle-info.component.html',
  styleUrls: ['./vehicle-info.component.css'],
})
export class VehicleInfoComponent {
  @Output() closeVehicleEvent = new EventEmitter();
  @Input() public vehicle: Vehicle;
  closeVehicle() {
    this.closeVehicleEvent.emit();
  }
}
