import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  routeIndex: number = -1;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    // TODO: Using the id call the endpoint on backend and get the ride information and display it
    let id=this.activatedRoute.snapshot.paramMap.get("id");
    console.log('Id: ' + id);

    this.routes.push(
      new Route(
        new Location(45.25608864310402, 19.84577854086666, "Katolicka Porta"),
        new Location(45.25430718571828, 19.82089966970297, "Knin restoran"),
        NaN,
        NaN
      ),
      new Route(
        new Location(45.25430718571828, 19.82089966970297, "Knin restoran"),
        new Location(45.24477398222599, 19.84711471203027, "NTP"),
        NaN,
        NaN
      ),
      new Route(
        new Location(45.24477398222599, 19.84711471203027, "NTP"),
        new Location(45.24638066815601, 19.851675340866446, "FTN"),
        NaN,
        NaN
      )
    )
    this.mapComponent.loadMap();
  }

  ngAfterViewInit(): void {
    this.mapComponent.loadMap();
    this.showNextRoute();
  }

  showNextRoute() {
    if (this.routeIndex < this.routes.length - 1) {
      this.mapComponent.removeRoute(this.routes[this.routeIndex]);
      this.routeIndex++;
      this.mapComponent.showRoute(this.routes[this.routeIndex]);
      this.mapComponent.focusOnPoint(this.routes[this.routeIndex].departure);
      console.log(this.routeIndex);
    }
  }

}
