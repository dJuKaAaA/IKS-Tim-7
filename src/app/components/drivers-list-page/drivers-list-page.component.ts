import { Component, Output } from '@angular/core';
import { Driver } from 'src/app/model/driver.model';
import { User } from 'src/app/model/user';
import { Vehicle } from 'src/app/model/vehicle.model';
import { DriverService } from 'src/app/services/driver.service';
import { UserService } from 'src/app/services/user.service';
import { Document } from 'src/app/model/document.model';

@Component({
  selector: 'app-drivers-list-page',
  templateUrl: './drivers-list-page.component.html',
  styleUrls: ['./drivers-list-page.component.css']
})
export class DriversListPageComponent {
  @Output() drivers: User[] = [];

  //atributi vozaca
  @Output() selectedDriver : Driver;
  @Output() vehicle : Vehicle;
  @Output() driverRating : number;
  @Output() vehicleRating : number;
  @Output() documents: Document[]


  public notBlocked:boolean = true;
  public message:string = "";

  constructor(private driverService:DriverService, private userService:UserService){
  }
  ngOnInit(): void {
    this.driverService.getDrivers().subscribe({
      next: data =>{
        this.drivers = data.results as User[];
      }
    })
  }

  selectUser(id:number){
    this.driverService.getDriver(id).subscribe
    ({
      next: driver => {
        this.selectedDriver = driver;
        //Dobavljanje ocena za vozaca i vozilo i vozaceva dokumenta
        this.driverService.getAvgDriverRating(this.selectedDriver.id).then(rating => {this.driverRating = rating});
        this.driverService.getAvgVehicleRating(this.selectedDriver.id).then(rating => {this.vehicleRating = rating});
        this.driverService.getDocuments(this.selectedDriver.id).subscribe(document => {this.documents = document});
      },
      error: () => {
      }
    });
    this.message = "";
  }

  block(){
    this.userService.block(this.selectedDriver.id).subscribe({
      next: data =>{
        this.message = "Passenger succesfully blocked";
      },
      error: data => {
        this.message = "This user is already blocked";
      }
    }
    );
  }
}
