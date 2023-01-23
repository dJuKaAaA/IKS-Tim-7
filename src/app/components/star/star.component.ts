import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css'],
})
export class StarComponent {
  @Input() rating: number = 0;
  @ViewChild("stars") stars: ElementRef<HTMLDivElement>;

  changeRating(event:any){
    console.log(event.clientX)
    console.log(this.stars.nativeElement.getBoundingClientRect().x);
    console.log(this.stars.nativeElement.getBoundingClientRect().width)
    this.rating = (event.clientX - this.stars.nativeElement.getBoundingClientRect().x) * 5 / this.stars.nativeElement.getBoundingClientRect().width;
    console.log(this.rating);
  }
}
