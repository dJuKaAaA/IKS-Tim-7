import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Driver } from 'src/app/model/driver.model';
import { Panic } from 'src/app/model/panic';
import { SimpleUser } from 'src/app/model/simple-user.model';
import { User } from 'src/app/model/user';
import { DriverService } from 'src/app/services/driver.service';
import { PanicService } from 'src/app/services/panic.service';
import { PassengerService } from 'src/app/services/passenger.service';

@Component({
  selector: 'app-panic-review-page',
  templateUrl: './panic-review-page.component.html',
  styleUrls: ['./panic-review-page.component.css']
})
export class PanicReviewPageComponent implements OnInit{
  @Output() public panic: Panic;
  @Output() public driver : User;
  @Output() public passengers : User[] = [];
  @Output() public rolePassenger : String = "passenger";
  @Output() public roleDriver : String = "driver";
  @Output() public time: string = "";
  @Output() public destination : string = "";
  @Output() public departure: string = "";
  @Output() public passengerIds: number[] = [];
  @Output() public driverId: number;
  @Output() public user: User;
  constructor(private panicService: PanicService, private activatedRoute : ActivatedRoute, private driverService: DriverService, private passengerService: PassengerService){

  }
  ngOnInit(): void {
    const id: any = this.activatedRoute.snapshot.paramMap.get("id");
    this.panicService.getPanicById(id).subscribe({
      next: p => {
        this.panic = p;
        this.user = this.panic.user;
        console.log(this.panic);
        this.driverId = this.panic.ride.driver.id;
        this.driverService.getDriver(this.panic.ride.driver.id).subscribe(dr => this.driver = dr);
        for(let passenger of this.panic.ride.passengers){
          this.passengerIds.push(passenger.id);
          this.passengerService.getPassenger(passenger.id).subscribe(pass => {
          this.passengers.push(pass as User)
          })
        }
        this.time = this.panic.ride.estimatedTimeInMinutes.toString();
        this.destination = this.panic.ride.locations[this.panic.ride.locations.length - 1].destination.address
        this.departure = this.panic.ride.locations[0].departure.address;
      }
    })
  }
  

}
