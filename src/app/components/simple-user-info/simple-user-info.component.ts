import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-simple-user-info',
  templateUrl: './simple-user-info.component.html',
  styleUrls: ['./simple-user-info.component.css'],
})
export class SimpleUserInfoComponent {
  @Input() img: string;
  @Input() name: string;
  @Input() surname: string;
  @Input() email: string;
}
