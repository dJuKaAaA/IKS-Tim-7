import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  public cardNumber: number;
  public expirationDate: string;
  public CVC: number;
  public name: string;
  public message: string = "";
  public paymentMethod: string = "Credit card";
  public paymentMethods: string[] = ["Credit card", "PayPal", "PaySafe"];
  @Input() rideIsFinished: boolean = false;

  pay(f:NgForm){
    f.reset();
    this.message = "Successfully payed"
    console.log(this.cardNumber, this.expirationDate, this.CVC, this.name);
  }

  select(paymentM: string){
    this.paymentMethod = paymentM;
  }
}
