import { Component, Input, OnInit, Output } from '@angular/core';
import { SimpleUser } from 'src/app/model/simple-user.model';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit{
  @Input() public user: User;
  @Input() public role: String;
  @Input() public id: number;
  @Input() public userThatSubmited: User;
  @Output() public outputId: number;
  public setTag:boolean = false;
  public showProfile:boolean = false;

  ngOnInit(): void {
    // console.log(this.user);
    this.outputId = this.id;
    if(this.user.id == this.id){
      this.setTag = true;
    }
    // console.log(this.outputId);
  }

  displayProfile(): void{
    this.showProfile = !this.showProfile;
  }
}
