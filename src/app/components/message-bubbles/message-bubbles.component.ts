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
  senderId: number = 1;

  typingMessageContent: string = "";

  ngOnInit() {
    for (let i = 1; i <= this.dummyMessageCount; ++i) {
      if (Math.random() > 0.5) {
        this.appendMessage({
          id: i,
          timeOfSending: new Date(),
          senderId: 1,
          receiverId: 2,
          message: "Hello there :)",
          type: "RIDE",
          rideId: 1
        })
      } else {
        this.appendMessage({
          id: i,
          timeOfSending: new Date(),
          senderId: 2,
          receiverId: 1,
          message: "General Kenobi >:)",
          type: "RIDE",
          rideId: 1
        })
      }
    }
  }

  sendMessage() {
    if (this.typingMessageContent == "") { 
      return;
    }
    const messageId: number = Math.floor(Math.random() * 10000);
    console.log(messageId);
    const message = {
      id: messageId,
      timeOfSending: new Date(),
      senderId: 1,
      receiverId: 2,
      message: this.typingMessageContent,
      type: "RIDE",
      rideId: 1
    };
    this.appendMessage(message);
    this.typingMessageContent = "";
    
  }

  appendMessage(message: Message) {
    this.messages.push(message);
    setTimeout(() => {
      const bubblesContainer = document.getElementsByClassName("bubbles-container")[0];
      bubblesContainer.scrollTop = bubblesContainer.scrollHeight;
    }, 300);

  } 

  
}
