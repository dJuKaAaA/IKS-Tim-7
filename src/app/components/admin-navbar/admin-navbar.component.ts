import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

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

  openRideHistory() {
    this.router.navigate(['userRideHistory']);
  }

  openChat() {
    this.router.navigate(['admin-chat']);
  }

  openPassengersList(){
    this.router.navigate(['passengers-list']);
  }

  openDriversList(){
    this.router.navigate(['drivers-list']);
  }

  openHomePage(){
    this.router.navigate(['admin-home']);
  }
  
  openReportCharts() {
    this.router.navigate(['report-charts'])
  }

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
