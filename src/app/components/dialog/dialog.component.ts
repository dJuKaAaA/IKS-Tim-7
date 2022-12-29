import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { header: string, body: string }, 
    private matDialogRef: MatDialogRef<DialogComponent>) {}
  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  close() {
    this.matDialogRef.close();
  }

}
