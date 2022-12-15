import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, Output } from '@angular/core';
import { Driver } from 'src/app/model/driver.model';
import { DriverService } from 'src/app/services/driver.service';

@Component({
  selector: 'app-admin-homepage',
  templateUrl: './admin-homepage.component.html',
  styleUrls: ['./admin-homepage.component.css']
})
export class AdminHomepageComponent implements OnInit{
  @Output() 
  drivers : Driver[];
  
  constructor(private driverService : DriverService){
    this.driverService = driverService;
  }
  ngOnInit(): void {
    this.driverService.getDrivers().subscribe(data => {this.drivers = data.results});
  }

}
