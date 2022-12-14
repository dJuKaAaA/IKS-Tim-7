import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs';
import { Location } from 'src/app/model/location.model';
import { Route } from 'src/app/model/route.model';
import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-driver-current-ride',
  templateUrl: './driver-current-ride.component.html',
  styleUrls: ['./driver-current-ride.component.css']
})
export class DriverCurrentRideComponent implements OnInit, AfterViewInit {

  @ViewChild(MapComponent) mapComponent: MapComponent;

  routes: Array<Route> = [];

  ngOnInit(): void {
    this.routes.push(
      new Route(
        new Location(45.25608864310402, 19.84577854086666, "Katolicka Porta"),
        new Location(45.25430718571828, 19.82089966970297, "Knin restoran"),
        NaN
      ),
      new Route(
        new Location(45.25430718571828, 19.82089966970297, "Knin restoran"),
        new Location(45.24477398222599, 19.84711471203027, "NTP"),
        NaN
      ),
      new Route(
        new Location(45.24477398222599, 19.84711471203027, "NTP"),
        new Location(45.24638066815601, 19.851675340866446, "FTN"),
        NaN
      )
    )
    this.mapComponent.loadMap();
  }

  ngAfterViewInit(): void {
    this.mapComponent.loadMap();
  }

  showRoutes() {
    for (let route of this.routes) {
      this.mapComponent.showRoute(route);
    }
    this.mapComponent.focusOnPoint(this.routes[0].departure);
  }

}
