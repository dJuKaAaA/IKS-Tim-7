export class DateTime {
  constructor() {}

  /** 
  Expected format 20.11.2022 14:15:13
  */
  public toDate(dateString: String): Date {
    const [dateValues, timeValues]: String[] = dateString.split(' ');

    const [day, month, year]: String[] = dateValues.split('.');
    const [hours, minutes, seconds]: String[] = timeValues.split(':');
    console.log(year);

    return new Date(+year, +month - 1, +day, +hours, +minutes, +seconds);
  }

  /** 
  Expected format 20.11.2022 14:15:13
  */
  public toString(date: Date): String {
    const year: number = date.getFullYear();
    const month: number = date.getMonth();
    const day: number = date.getDay();

    const hours: number = date.getHours();
    const minutes: number = date.getMinutes();
    const seconds: number = date.getSeconds();

    return `${year}.${month}.${day} ${hours}: ${minutes}:${seconds}`;
  }

  public getDate(date: Date): String {
    const year: number = date.getFullYear();
    const month: number = date.getMonth();
    const day: number = date.getDay();

    return `${year}.${month}.${day}`;
  }

  public getTime(date: Date): String {
    const hours: number = date.getHours();
    const minutes: number = date.getMinutes();
    const seconds: number = date.getSeconds();

    return `${hours}h:${minutes}m:${seconds}s`;
  }

  public getDiffDateTime(
    endDate: Date,
    startDate: Date
  ): [days: number, hours: number, minutes: number, secs: number] {
    let diffTime = Math.abs(endDate.valueOf() - startDate.valueOf());
    let days: number = diffTime / (24 * 60 * 60 * 1000);
    let hours: number = (days % 1) * 24;
    let minutes: number = (hours % 1) * 60;
    let secs: number = (minutes % 1) * 60;
    [days, hours, minutes, secs] = [
      Math.floor(days),
      Math.floor(hours),
      Math.floor(minutes),
      Math.floor(secs),
    ];

    return [days, hours, minutes, secs];
  }
}
