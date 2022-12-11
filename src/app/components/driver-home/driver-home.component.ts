import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-driver-home',
  templateUrl: './driver-home.component.html',
  styleUrls: ['./driver-home.component.css']
})
export class DriverHomeComponent implements OnInit {

  dummy: Array<number> = [];
  cardCount: number = 10;

  ngOnInit(): void {
    for (let i = 0; i < this.cardCount; ++i) {
      this.dummy.push(i);
    }
  }

  

}
