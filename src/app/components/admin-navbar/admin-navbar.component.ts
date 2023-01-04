import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Panic } from 'src/app/model/panic';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent{

  public showPanic : boolean = true;
  private firstOpen : boolean = true;
  public numberOfUnreviewedMessages : number = 0;

  

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['']);
  }

  changeState(){
    this.showPanic = !this.showPanic;
  }

  setNumberOfUnreviewedMessages(obj : any){
    this.numberOfUnreviewedMessages = obj.num;
    this.showPanic = obj.show;
    if(this.firstOpen){
      this.showPanic = false;
      this.firstOpen = false;
    }
  }

}
