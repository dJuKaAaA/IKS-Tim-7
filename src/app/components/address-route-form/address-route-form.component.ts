import { Component, Input } from '@angular/core';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-address-route-form',
  templateUrl: './address-route-form.component.html',
  styleUrls: ['./address-route-form.component.css']
})
export class AddressRouteFormComponent {

  @Input() startAddress: string = "";
  @Input() endAddress: string = "";
  @Input() mapComponent: MapComponent;
  @Input() callbackFunc = (): void => {};

  showRoute(): void {
    this.mapComponent.clearMap();
    this.mapComponent.showRouteFromAddresses(this.startAddress, this.endAddress);
    this.callbackFunc();
  }

}
