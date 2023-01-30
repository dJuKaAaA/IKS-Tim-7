import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageParserService {
  private readFile(file: File, subscriber: Subscriber<any>): void {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      subscriber.next(fileReader.result);
      subscriber.complete();
    };

    fileReader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    };
  }

  public convertToBase64(file: File): Observable<any> {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });
    return observable;
  }

  public removeBase64FromImage(imageUrl: string): string {
    return this.removeUpToDelimiter(imageUrl, ',');
  }

  getImageUrl(imageString: string): string {
    return `data:image/*;base64,${imageString}`;
  }

  private removeUpToDelimiter(string: string, delimiter: string) {
    var index = string.indexOf(delimiter);
    if (index !== -1) {
      return string.substring(index + 1);
    }
    return string;
  }
}
