import { Component, OnInit, Output } from '@angular/core';
import { Passenger } from 'src/app/model/passenger.model';
import { User } from 'src/app/model/user';
import { PassengerService } from 'src/app/services/passenger.service';
import { UserService } from 'src/app/services/user.service';
import { PassengerProfileDetailsComponent } from '../passenger-profile-details/passenger-profile-details.component';

@Component({
  selector: 'app-passengers-list-page',
  templateUrl: './passengers-list-page.component.html',
  styleUrls: ['./passengers-list-page.component.css']
})
export class PassengersListPageComponent implements OnInit{
  @Output() selectedPassengerId:number = -1;
  @Output() passengers: User[] = [];

  public selectedPassenger: Passenger;
  public notBlocked:boolean = true;
  public message:string = "";

  constructor(private passengerService:PassengerService, private userService:UserService){
  }
  ngOnInit(): void {
    this.passengerService.getPassengers().subscribe({
      next: data =>{
        this.passengers = data.results as User[];
        this.passengers.length
      }
    })
  }

  selectUser(id:number){
    this.passengerService.getPassenger(id).subscribe({
      next: passenger=>{
        this.selectedPassenger = passenger;
      }
    })
    this.selectedPassengerId = id;
    this.message = "";
  }

  block(){
    this.userService.block(this.selectedPassengerId).subscribe({
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
