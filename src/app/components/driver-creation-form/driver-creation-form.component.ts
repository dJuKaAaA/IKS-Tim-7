import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Driver } from 'src/app/model/driver.model';
import { Vehicle } from 'src/app/model/vehicle.model';
import { DriverService } from 'src/app/services/driver.service';
import { ImageParserService } from 'src/app/services/image-parser.service';
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
  public profilePicture:string;

  constructor(private vehicleService : VehicleService, private driverService : DriverService,private imageParserService:ImageParserService, private router: Router){
  }
  
  onSubmit(){
    this.driverService.saveDriver(this.user).subscribe({
      next: driver=>{
        this.updateMessage = "Driver created successfully";
        if(this.selectedVehicle.id != undefined)
          this.vehicleService.setDriver(this.selectedVehicle.id, driver.id).subscribe(vehicle => {
        });
        this.router.navigate(["drivers-list"]);
      },
      error: error=>{
        this.updateMessage = error.error.message
      }
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

  onProfileImageSelected(event: any): void {
    let newProfileImage: File;
    if (event.target.files) {
      newProfileImage = event.target.files[0];
      this.imageParserService
        .convertToBase64(newProfileImage)
        .subscribe((img) => {
          this.profilePicture = img;
          this.user.profilePicture = this.imageParserService.removeBase64FromImage(
            img as string
          );
        });
    }
  }

}
