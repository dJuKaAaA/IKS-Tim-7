import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RideRequest } from 'src/app/model/ride-request.model';
import { Ride } from 'src/app/model/ride.model';
import { DateTimeService } from 'src/app/services/date-time.service';
import { RideService } from 'src/app/services/ride.service';
import { environment } from 'src/environment/environment';
import { DialogComponent } from '../dialog/dialog.component'
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client'; import { NgxMaterialTimepickerComponent } from 'ngx-material-timepicker';
import { split } from 'lodash';
;

@Component({
  selector: 'app-schedule-time-dialog',
  templateUrl: './schedule-time-dialog.component.html',
  styleUrls: ['./schedule-time-dialog.component.css']
})
export class ScheduleTimeDialogComponent implements OnInit {

  rideTime: string = "";
  private stompClient: any;
  @ViewChild('timePicker') timepicker: NgxMaterialTimepickerComponent;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { rideRequest: RideRequest },
    private matDialogRef: MatDialogRef<ScheduleTimeDialogComponent>,
    private dateTimeService: DateTimeService,
    private rideService: RideService,
    private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    let ws = new SockJS(environment.socketUrl);
    this.stompClient = Stomp.over(ws);
  }

  close() {
    this.matDialogRef.close();
  }

  private getStartTimeFromString(timeString: string): { time: string | undefined } {
    let splitTimeString = timeString.trim().split(":");
    if (splitTimeString.length < 2) {
      return { time: undefined };
    }

    const hours: number = +splitTimeString[0];
    const minutes: number = +splitTimeString[1];

    if (!Number.isNaN(hours) && !Number.isNaN(minutes)) {
      let hoursString: string = ""
      if (hours >= 0 && hours <= 23) {
        if (hours < 10) {
          hoursString = `0${hours}`;
        } else {
          hoursString = `${hours}`;
        }
      }
      let minutesString: string = ""
      if (minutes >= 0 && minutes <= 59) {
        if (minutes < 10) {
          minutesString = `0${minutes}`;
        } else {
          minutesString = `${minutes}`;
        }
      }
      if (hoursString == "" || minutesString == "") {
        return { time: undefined };
      }
      return { time: `${hoursString}:${minutesString}:00` }
    }

    return { time: undefined }
  }

  scheduleRide() {
    let immediateScheduling = false;
    let rideDate: Date = new Date();
    if (this.rideTime) {
      const rideTime = this.getStartTimeFromString(this.rideTime).time;
      if (rideTime == undefined) {
        this.matDialog.open(DialogComponent, {
          data: {
            header: "Invalid",
            body: "Invalid time format"
          }
        });
        return;
      }
      const hours: number = +rideTime.split(":")[0];
      const minutes: number = +rideTime.split(":")[1];
      rideDate.setHours(hours);
      rideDate.setMinutes(minutes);
    } else {
      immediateScheduling = true;
    }

    this.data.rideRequest.scheduledTime = immediateScheduling ? undefined : this.dateTimeService.toString(rideDate);

    this.rideService.createRide(this.data.rideRequest).subscribe({
      next: (result: Ride) => {
        this.matDialog.open(DialogComponent, {
          data: {
            header: "Success!",
            body: "Ride successfully scheduled"
          }
        });
        this.stompClient.send("/socket-subscriber/send/scheduled/ride", {}, JSON.stringify(result));
        this.close();
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse) {
          // TODO: Show dialogs for errors after actual schedule ride functionality is implemented
          this.matDialog.open(DialogComponent, {
            data: {
              header: "Error!",
              body: error.error.message
            }
          });
        }
      }
    });
  }

  clearScheduleTime() {
    this.rideTime = "";
  }

  timeSelected() {
    console.log("Go fuck yourself");
  }
}
