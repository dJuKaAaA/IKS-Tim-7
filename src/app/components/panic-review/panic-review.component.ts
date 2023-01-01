import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-panic-review',
  templateUrl: './panic-review.component.html',
  styleUrls: ['./panic-review.component.css']
})
export class PanicReviewComponent implements OnInit{
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
