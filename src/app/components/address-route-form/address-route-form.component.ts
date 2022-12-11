import { Component, Input } from '@angular/core';
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
  @Input() mapComponent: MapComponent;
  @Input() callbackFunc = (): void => {};


  showRoute(): void {
    this.mapComponent.clearMap();
    let startAddress: string = this.startAddressControl.value || "";
    let endAddress: string = this.endAddressControl.value || "";
    this.mapComponent.showRouteFromAddresses(startAddress, endAddress);
    this.callbackFunc();
  }

}
