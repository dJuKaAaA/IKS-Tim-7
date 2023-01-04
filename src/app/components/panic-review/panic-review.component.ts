import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Panic } from 'src/app/model/panic';
import { PanicService } from 'src/app/services/panic.service';

@Component({
  selector: 'app-panic-review',
  templateUrl: './panic-review.component.html',
  styleUrls: ['./panic-review.component.css']
})
export class PanicReviewComponent implements OnInit{

  @Output() public panicList : Panic[];
  @Input() public panicIndex : number;
  @Output() unreviewedMessagesNumberEvent = new EventEmitter<{num: number, show: boolean}>();

  private unreviewedMessagesNumber : number = 0;

  constructor(private panicService : PanicService){}
  ngOnInit(): void {
    this.panicService.getPanicMessages().subscribe({
      next: panicPage => {
        this.panicList = panicPage.results;
        for(let panic of this.panicList){
          if(!panic.reviewed){
            this.unreviewedMessagesNumber += 1;
          }
        }
        this.unreviewedMessagesNumberEvent.emit({
          num : this.unreviewedMessagesNumber,
          show: true,
        });
      }
    })
  }

  openDetailedPanic(id : number) : void{

  }

  panicReviewed(obj: any){
    this.unreviewedMessagesNumberEvent.emit({
      num : this.unreviewedMessagesNumber += obj.num,
      show: obj.show,
    });
  }

}
