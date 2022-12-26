import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ride-details',
  templateUrl: './ride-details.component.html',
  styleUrls: ['./ride-details.component.css']
})
export class RideDetailsComponent implements OnInit {

  @Input() destination: string = "N/A";
  @Input() departure: string = "N/A";
  @Input() departureDate: string = "N/A";
  @Input() departureTime: string = "N/A";
  @Input() duration: string = "N/A";
  @Input() distance: string = "N/A";
  @Input() price: string = "N/A";

  ngOnInit(): void {

  }

}
