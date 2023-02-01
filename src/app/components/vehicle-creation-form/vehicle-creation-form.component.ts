import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from 'src/app/model/location.model';
import { VehicleDTO } from 'src/app/model/vehicle-dto';
import { VehicleType } from 'src/app/model/vehicle-type';
import { VehicleTypeService } from 'src/app/services/vehicle-type.service';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-vehicle-creation-form',
  templateUrl: './vehicle-creation-form.component.html',
  styleUrls: ['./vehicle-creation-form.component.css']
})
export class VehicleCreationFormComponent implements OnInit{
  public message:string = "";
  public model:string = "";
  public passengerSeats:number;
  public licensePlate:string = "";
  public lastPage:string = "";
  public vehicleType:string;
  public babyTransport:boolean = false;
  public petTransport:boolean = false;
  public currentLocation:Location = new Location(	45.25685617386568, 19.84799528633145, "Zmaj Jovina 26");
  public vehicleTypes : VehicleType[];

  constructor(private vehicleService : VehicleService, private vehicleTypeService : VehicleTypeService, private router:Router){
  }
  ngOnInit(): void {
    this.vehicleTypeService.getAll().subscribe(vehicleTypes => {
      this.vehicleTypes = vehicleTypes;
    });
  }

  onSubmit(){
    let vehicle:VehicleDTO = {
      currentLocation : this.currentLocation,
      vehicleType : this.vehicleType,
      model : this.model,
      licenseNumber : this.licensePlate,
      passengerSeats : this.passengerSeats,
      babyTransport : this.babyTransport,
      petTransport : this.petTransport
    };
    this.vehicleService.save(vehicle).subscribe({
      next: ()=>{
        this.message = "Vehicle created succesfully";
        this.router.navigate(["create-driver"]);
      },
      error: (error) => {
        this.message = error.error.message
      }
    }
    );
  }
}
