import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface SliderImage {
  image: String;
  thumbImage: String;
  title: String;
  alt: String;
}

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css'],
})
export class ImageSliderComponent {
  @Input() imgCollection: SliderImage[] = new Array();
  @Output() closeImageSliderEvent = new EventEmitter();

  hideSlideBar(): void {
    this.closeImageSliderEvent.emit();
  }
}
