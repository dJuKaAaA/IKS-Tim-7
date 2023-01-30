import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateTimeService {
  constructor() {}

  /** 
  Expected format 20.11.2022 14:15:13
  */
  public toDate(dateString: String): Date {
    const [dateValues, timeValues]: String[] = dateString.split(' ');

    const [day, month, year]: String[] = dateValues.split('.');
    const [hours, minutes, seconds]: String[] = timeValues.split(':');

    return new Date(+year, +month - 1, +day, +hours, +minutes, +seconds);
  }

  /** 
  Expected format 20.11.2022 14:15:13
  */
  public toString(date: Date): string {
    const year: number = date.getFullYear();
    const month: number = date.getMonth() + 1;
    const day: number = date.getDate();

    const hours: number = date.getHours();
    const minutes: number = date.getMinutes();
    const seconds: number = date.getSeconds();

    const dayString = day < 10 ? `0${day}` : `${day}`;
    const monthString = month < 10 ? `0${month}` : `${month}`;

    const hoursString = hours < 10 ? `0${hours}` : `${hours}`;
    const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const secondsString = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return `${dayString}.${monthString}.${year} ${hoursString}:${minutesString}:${secondsString}`;
  }

  public getDate(date: Date): String {
    let [year, month, day] = this.toString(date).split(' ')[0].split('.');
    return `${year}.${month}.${day}`;
  }

  public getTime(date: Date): String {
    let [hours, minutes, seconds] = this.toString(date)
      .split(' ')[1]
      .split(':');

    return `${hours}:${minutes}:${seconds}`;
  }

  public getDiffDateTime(
    endDate: Date,
    startDate: Date
  ): [hours: number, minutes: number, secs: number] {
    let [endHours, endMinutes, endSeconds] = this.toString(endDate)
      .split(' ')[1]
      .split(':');
    let [startHours, startMinutes, startSeconds] = this.toString(startDate)
      .split(' ')[1]
      .split(':');

    let hours: number = Number(endHours) - Number(startHours);
    console.log(hours);
    let minutes: number = Number(endMinutes) - Number(startMinutes);
    console.log(minutes);
    let secs: number = Number(endSeconds) - Number(startSeconds);
    console.log(secs);
    return [hours, minutes, secs];
  }
}
