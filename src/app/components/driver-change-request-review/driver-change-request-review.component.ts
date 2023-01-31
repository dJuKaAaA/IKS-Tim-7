import { Component, OnInit } from '@angular/core';
import { DriverProfileChangeRequest } from 'src/app/model/driver-profile-change-request.model';
import { AuthService } from 'src/app/services/auth.service';
import { ImageParserService } from 'src/app/services/image-parser.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-driver-change-request-review',
  templateUrl: './driver-change-request-review.component.html',
  styleUrls: ['./driver-change-request-review.component.css']
})
export class DriverChangeRequestReviewComponent implements OnInit{
  requests: DriverProfileChangeRequest[] 
  constructor(private imageParserService:ImageParserService, private requestService:RequestService, authService:AuthService){

  }
  ngOnInit(): void {

    this.requestService.getAllPendingRequests().subscribe({
      next: data =>{
        this.requests = data;
        alert(data[0].documents[1].name);
      }
    });
  }

  public getConvertedImage(img:string): String {
    return this.imageParserService.getImageUrl(img);
  }

  public changeStatus(status:string, requestId:number, index:number){
    this.requests.splice(index);
    if(status == "approve"){
      this.requestService.aprove(requestId).subscribe();
    }else{
      this.requestService.deny(requestId).subscribe();
    }
  }
}
