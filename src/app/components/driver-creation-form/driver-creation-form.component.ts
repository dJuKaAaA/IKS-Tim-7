import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Driver } from 'src/app/model/driver.model';
import { Vehicle } from 'src/app/model/vehicle.model';
import { DriverService } from 'src/app/services/driver.service';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-driver-creation-form',
  templateUrl: './driver-creation-form.component.html',
  styleUrls: ['./driver-creation-form.component.css']
})
export class DriverCreationFormComponent implements OnInit{
  public user : Driver = {} as Driver;
  public message : string = "";
  public confirmedPassword : string = "";
  public selectedVehicle : Vehicle;
  public availableVehicles : Vehicle[] = [];
  public updateMessage : string = "";

  constructor(private vehicleService : VehicleService, private driverService : DriverService){
  }
  
  onSubmit(){
    console.log(this.selectedVehicle);
    console.log(this.user);
    this.driverService.saveDriver(this.user).subscribe(driver => {
      if(this.selectedVehicle.id == undefined)
        return;
      this.vehicleService.setDriver(this.selectedVehicle.id, driver.id).subscribe(vehicle => {
        this.updateMessage = "Driver created successfully";
      });
    });

  }

  ngOnInit(): void {
    this.vehicleService.getVehicles().subscribe({
      next: (vehiclePage) => {
        let vehicles = vehiclePage.results;
        for (let vehicle of vehicles){
          if(vehicle.driverId == null)
            this.availableVehicles.push(vehicle);
        }
      },
      error: () => {
      }
    });
  }

}
