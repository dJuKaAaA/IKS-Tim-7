import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Panic } from 'src/app/model/panic';

@Component({
  selector: 'app-panic-list',
  templateUrl: './panic-list.component.html',
  styleUrls: ['./panic-list.component.css']
})
export class PanicListComponent {
  @Input() public panicList : Panic[];

  @Output() newItemEvent = new EventEmitter<number>();

  //Ova metoda se zove na klik i vraca index kliknutog usera, pa onda u parent komponenti obradite sta treba
  selectPanic(id:number){
    this.newItemEvent.emit(id);
  }
}
