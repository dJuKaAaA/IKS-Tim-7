import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Message } from 'src/app/model/message.model';
import { environment } from 'src/environment/environment';
import { AuthService } from 'src/app/services/auth.service';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { DateTimeService } from 'src/app/services/date-time.service';
import { UserService } from 'src/app/services/user.service';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';

@Component({
  selector: 'app-message-bubbles',
  templateUrl: './message-bubbles.component.html',
  styleUrls: ['./message-bubbles.component.css']
})
export class MessageBubblesComponent implements OnInit, OnDestroy {
  
  @Input() messages: Array<Message> = [];
  senderId: number;
  @Input() receiverId: number = -1;
  @Input() rideId: number = -1;
  @Input() messageType = "RIDE";

  private stompClient: any;

  typingMessageContent: string = "";

  constructor(private authService: AuthService, private dateTimeService: DateTimeService, private userService: UserService) {
    this.senderId = authService.getId();
  }

  ngOnDestroy(): void {
    this.stompClient.disconnect();
  }

  ngOnInit(): void {
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    let ws = new SockJS(environment.socketUrl);
    this.stompClient = Stomp.over(ws);

    this.stompClient.connect({}, () => {
      this.openSocket();
    });
  }

  public reopenSocket() {
    this.stompClient.disconnect();
    this.initializeWebSocketConnection();
  }

  openSocket() {
    this.stompClient.subscribe(`/socket-send-message/sender/${this.receiverId}/receiver/${this.senderId}`, (message: { body: string; }) => {
      this.handleResult(message);
    });
  }

  handleResult(message: { body: string; }) {
    if (message.body) {
      let messageResult: Message = JSON.parse(message.body);
      this.appendMessage(messageResult);
    }
  }

  sendMessage() {
    if (this.typingMessageContent == "") {
      return;
    }
    console.log(this.receiverId);
    let message: Message;
    if (this.rideId == -1) {
      message = {
        timeOfSending: this.dateTimeService.toString(new Date()),
        senderId: this.senderId,
        receiverId: this.receiverId,
        message: this.typingMessageContent,
        type: this.messageType,
      };
    } else {
      message = {
        timeOfSending: this.dateTimeService.toString(new Date()),
        senderId: this.senderId,
        receiverId: this.receiverId,
        message: this.typingMessageContent,
        type: this.messageType,
        rideId: this.rideId
      };
    }
    this.userService.sendMessage(this.receiverId, message).subscribe({
      next: (sentMessage: Message) => {
        this.stompClient.send("/socket-subscriber/send/message", {}, JSON.stringify(sentMessage));
        this.appendMessage(sentMessage);
        this.typingMessageContent = "";
      }
    })
  }

  appendMessage(message: Message) {
    this.messages.push(message);
    setTimeout(() => {
      const bubblesContainer = document.getElementsByClassName("bubbles-container")[0];
      bubblesContainer.scrollTop = bubblesContainer.scrollHeight;
    }, 300);

  } 
  
}
