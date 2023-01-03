import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Message } from 'src/app/model/message.model';

@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css']
})
export class ChatDialogComponent {

  // TODO: Delete senderId and receiever id later
  constructor(@Inject(MAT_DIALOG_DATA) public data: { messages: Array<Message>, receiverId: number }, private matDialogRef: MatDialogRef<ChatDialogComponent>) {}
  
  close() {
    this.matDialogRef.close();
  }

}
