import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ride-details',
  templateUrl: './ride-details.component.html',
  styleUrls: ['./ride-details.component.css']
})
export class RideDetailsComponent implements OnInit{

  @Input() destination: string = "Novi sad, Katolicka Porta 4";
  @Input() departure: string = "Novi sad, Katolicka Porta 4";
  @Input() departureDate: string = "16.11.2022.";
  @Input() departureTime: string = "15:30";
  @Input() duration: string = "15:36";
  @Input() distance: string = "1000m";

  ngOnInit(): void {

  }

}
