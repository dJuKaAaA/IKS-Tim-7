import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Panic } from 'src/app/model/panic';
import { ImageParserService } from 'src/app/services/image-parser.service';
import { PanicService } from 'src/app/services/panic.service';

@Component({
  selector: 'app-panic-list',
  templateUrl: './panic-list.component.html',
  styleUrls: ['./panic-list.component.css']
})
export class PanicListComponent {
  constructor(private panicService : PanicService, private router : Router, private imageParserService: ImageParserService){

  }

  @Input() public panicList : Panic[];

  @Output() PanicReviewedEvent = new EventEmitter<{show:boolean, num: number}>();

  //Ova metoda se zove na klik i vraca index kliknutog panica, pa onda u parent komponenti obradite sta treba
  selectPanic(id:number){
    this.setPanicAsReviewed(id, undefined, false);
    this.router.navigate(["/panic-review", id]).then(page => {window.location.reload();});
  }

  setPanicAsReviewed(id:number, event: { stopPropagation: () => void; } | undefined, show : boolean = true){
    if(event != undefined)
      event.stopPropagation();
    this.panicService.getPanicById(id).subscribe({
      next: panic => {
        if(panic.reviewed == true){
          this.PanicReviewedEvent.emit({show:show, num : 0});
          return;
        }
        console.log(JSON.stringify(panic));
        panic.reviewed = true;
        this.panicService.setAsReviewed(panic.id).subscribe(data => {});
        this.PanicReviewedEvent.emit({show:show, num:-1});
      }
    })
  }

  getImg(index:number){
    console.log(this.panicList[index]);
    return this.imageParserService.getImageUrl(this.panicList[index].user.profilePicture);
  }
}
