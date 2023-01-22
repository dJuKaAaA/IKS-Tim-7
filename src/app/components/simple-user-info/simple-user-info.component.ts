import { Component, Input } from '@angular/core';
import { ImageParserService } from 'src/app/services/image-parser.service';

@Component({
  selector: 'app-simple-user-info',
  templateUrl: './simple-user-info.component.html',
  styleUrls: ['./simple-user-info.component.css'],
})
export class SimpleUserInfoComponent {
  constructor(private imageParserService: ImageParserService) {}

  @Input() img: string;
  @Input() name: string;
  @Input() surname: string;
  @Input() email: string;

  public getConvertedImage(): String {
    return this.imageParserService.getImageUrl(this.img);
  }
}
