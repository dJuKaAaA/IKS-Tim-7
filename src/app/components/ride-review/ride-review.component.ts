import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReviewService } from 'src/app/services/review.service';
import { Review } from 'src/app/model/review.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-ride-review',
  templateUrl: './ride-review.component.html',
  styleUrls: ['./ride-review.component.css']
})
export class RideReviewComponent {

  @Input() currentRideId: number;
  public driverComment:string = "";
  public vehicleComment:string = "";
  private driverRating: number = -1;
  private vehicleRating: number = -1;
  public vehicleTextColor:string = "black";
  public driverTextColor:string = "black";
  public vehicleRatingOffset:string = "0px";
  public driverRatingOffset:string = "0px";
  private vehicleReview:Review;
  private driverReview:Review;

  @Output() rated: EventEmitter<boolean> = new EventEmitter();

  constructor(private reviewService : ReviewService){

  }

  onSubmit(){
    let ret = false;
    if(this.driverComment != "" && this.driverRating == -1){
      this.driverTextColor = "red";
      this.driverRatingOffset = "5px";
      setTimeout(()=>{this.resetDriverOffset()},300);
      ret = true;
    }
    else
      this.driverTextColor = "black";
    if(this.vehicleComment != "" && this.vehicleRating == -1){
      this.vehicleTextColor = "red";
      this.vehicleRatingOffset = "5px";
      setTimeout(()=>{this.resetVehicleOffset()},300);
      ret = true;
    }
    else
      this.vehicleTextColor = "black";

    if(ret)
      return;

    if(this.vehicleRating != -1){
      this.vehicleReview = {rating:this.vehicleRating, comment:this.vehicleComment};
      this.reviewService.saveVehicleReview(this.vehicleReview, this.currentRideId).subscribe({
        error: (error) => {
          if (error instanceof HttpErrorResponse) {
            alert(error.error.message);
          }
        }
      });
    }

    if(this.driverRating != -1){
      this.driverReview = {rating:this.driverRating, comment:this.driverComment};
      this.reviewService.saveDriverReview(this.driverReview, this.currentRideId).subscribe({
        error: (error) => {
          if (error instanceof HttpErrorResponse) {
            alert(error.error.message);
          }
        }
      });
    }

    this.rated.emit(true);
    
  }

  resetDriverOffset(){
    this.driverRatingOffset = "0px";
  }

  resetVehicleOffset(){
    this.vehicleRatingOffset = "0px";
  }

  setRatingVehicle(rating:number){
    this.vehicleRating = rating
  }

  setRatingDriver(rating:number){
    this.driverRating = rating;
  }
}
