import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-address-route-form',
  templateUrl: './address-route-form.component.html',
  styleUrls: ['./address-route-form.component.css']
})
export class AddressRouteFormComponent {

  @Input() startAddressControl = new FormControl("");
  @Input() endAddressControl = new FormControl("");
  @Input() disableStartAddressField = false;

  @Output() submitEmitter: EventEmitter<void> = new EventEmitter<void>();

  submit() {
    this.submitEmitter.emit();
  }

}
