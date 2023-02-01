import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Driver } from 'src/app/model/driver.model';
import { User } from 'src/app/model/user';
import { ImageParserService } from 'src/app/services/image-parser.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})

export class UsersListComponent {
  @Input()
  public users : User[];

  @Output() newItemEvent = new EventEmitter<number>();

  constructor(private imageParserService:ImageParserService){

  }
  //Ova metoda se zove na klik i vraca index kliknutog usera, pa onda u parent komponenti obradite sta treba
  selectUser(index:number){
    this.newItemEvent.emit(index);
  }

  getImage(index:number){
    return this.imageParserService.getImageUrl(
      this.users[index].profilePicture
    );
  }
}
