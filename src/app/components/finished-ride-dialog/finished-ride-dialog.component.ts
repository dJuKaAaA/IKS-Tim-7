import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-finished-ride-dialog',
  templateUrl: './finished-ride-dialog.component.html',
  styleUrls: ['./finished-ride-dialog.component.css']
})
export class FinishedRideDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { rideId: number}, 
    private matDialogRef: MatDialogRef<DialogComponent>) {}
  close() {
    this.matDialogRef.close();
  }

  closeAfterReview(rated: boolean) {
    if (rated) {
      this.close();
    }
  }
}
