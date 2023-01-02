import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Panic } from 'src/app/model/panic';
import { PanicService } from 'src/app/services/panic.service';

@Component({
  selector: 'app-panic-list',
  templateUrl: './panic-list.component.html',
  styleUrls: ['./panic-list.component.css']
})
export class PanicListComponent {
  constructor(private panicService : PanicService){

  }

  @Input() public panicList : Panic[];

  @Output() panicClickedEvent = new EventEmitter<number>();
  @Output() PanicReviewedEvent = new EventEmitter<number>();

  //Ova metoda se zove na klik i vraca index kliknutog panica, pa onda u parent komponenti obradite sta treba
  selectPanic(id:number){
    this.panicClickedEvent.emit(id);
  }

  setPanicAsReviewed(id:number){
    // alert("ej");
    this.panicService.getPanicById(id).subscribe({
      next: panic => {
        if(panic.reviewed == true){
          return;
        }
        panic.reviewed = true;
        this.panicService.update(panic).subscribe();
        this.PanicReviewedEvent.emit();
      }
    })
  }
}
