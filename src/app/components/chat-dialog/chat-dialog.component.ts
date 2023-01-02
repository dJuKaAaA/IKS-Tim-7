import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css']
})
export class ChatDialogComponent implements OnInit {

  constructor(private matDialogRef: MatDialogRef<ChatDialogComponent>) {}
  
  ngOnInit(): void {
    // TODO: Load messages with admin from backend database
  }

  close() {
    this.matDialogRef.close();
  }

}
