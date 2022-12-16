import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Driver } from 'src/app/model/driver.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})

export class UsersListComponent {
  @Input()
  public users : Driver[];

  @Output() newItemEvent = new EventEmitter<number>();

  //Ova metoda se zove na klik i vraca index kliknutog usera, pa onda u parent komponenti obradite sta treba
  selectUser(index:number){
    console.log(index);
    this.newItemEvent.emit(index);
  }
}
