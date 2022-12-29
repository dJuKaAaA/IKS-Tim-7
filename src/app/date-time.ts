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
    let [year, month, day] = date.toString().split(' ')[0].split('.');
    return `${year}.${month}.${day}`;
  }

  public getTime(date: Date): String {
    let [hours, minutes, seconds] = date.toString().split(' ')[1].split(':');

    return `${hours}:${minutes}:${seconds}`;
  }

  public getDiffDateTime(
    endDate: Date,
    startDate: Date
  ): [hours: number, minutes: number, secs: number] {
    let [endHours, endMinutes, endSeconds] = endDate
      .toString()
      .split(' ')[1]
      .split(':');
    let [startHours, startMinutes, startSeconds] = startDate
      .toString()
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
