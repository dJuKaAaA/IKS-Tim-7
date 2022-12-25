import { Component, Input, OnInit } from '@angular/core';
import { Message } from 'src/app/model/message.model';

@Component({
  selector: 'app-message-bubbles',
  templateUrl: './message-bubbles.component.html',
  styleUrls: ['./message-bubbles.component.css']
})
export class MessageBubblesComponent implements OnInit {

  @Input() messages: Array<Message> = [];
  dummyArray: Array<number> = []
  dummyMessageCount = 20;

  ngOnInit() {
    for (let i = 0; i < this.dummyMessageCount; ++i) {
      this.dummyArray.push(i);
    }
  }

  
}
