import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'image-selector',
  imports: [
    NgIf,
    NgOptimizedImage
  ],
  templateUrl: './image-selector.component.html',
  styleUrl: './image-selector.component.scss'
})
export class ImageSelectorComponent {
  @Input() player_name: string;
  @Input() selectedImageSet: string;
  @Output() onImgSelected = new EventEmitter<string>();

  selectImageSet(image: string) {
    this.onImgSelected.emit(image);
  }
}
