import { Component, Input } from '@angular/core';
import { Driver } from 'src/app/model/driver.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent {
  @Input()
  public users : Driver[];
}
