import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { elementAt, reduce } from 'rxjs';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css'],
})
export class StarComponent {
  @Input() rating: number = 0;
  @Output() selectedRating: EventEmitter<number> = new EventEmitter(); 
  @ViewChild("stars") stars: ElementRef<HTMLDivElement>;


  changeRating(event:any){
    this.rating = (event.clientX - this.stars.nativeElement.getBoundingClientRect().x) * 5 / this.stars.nativeElement.getBoundingClientRect().width;  
    this.selectedRating.emit(this.rating);
  }
}
