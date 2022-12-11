import { Component, OnInit } from '@angular/core';
import { Route } from 'src/app/model/route.model';

@Component({
  selector: 'app-driver-home',
  templateUrl: './driver-home.component.html',
  styleUrls: ['./driver-home.component.css']
})
export class DriverHomeComponent implements OnInit {

  dummy: Array<number> = [];
  cardCount: number = 10;
  routes: Array<Route> = [];

  ngOnInit(): void {
    for (let i = 0; i < this.cardCount; ++i) {
      this.dummy.push(i);
    }
  }



}
