import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-btn1',
  templateUrl: './custom-btn1.component.html',
  styleUrls: ['./custom-btn1.component.css'],
})
export class CustomBtn1Component {
  @Input() public customColor: String;
  @Input() public content: String;
}
