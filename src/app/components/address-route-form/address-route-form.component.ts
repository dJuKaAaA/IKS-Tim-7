import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-address-route-form',
  templateUrl: './address-route-form.component.html',
  styleUrls: ['./address-route-form.component.css']
})
export class AddressRouteFormComponent {

  @Input() startAddressControl = new FormControl("");
  @Input() endAddressControl = new FormControl("");
  @Output() submitEmitter: EventEmitter<void> = new EventEmitter<void>();

  submit() {
    this.submitEmitter.emit();
  }

}
