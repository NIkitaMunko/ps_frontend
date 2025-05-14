import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'rating-component',
  imports: [
    DecimalPipe,
    FormsModule
  ],
  templateUrl: './rating.component.html',
  standalone: true,
  styleUrl: './rating.component.scss'
})
export class RatingComponent {
  @Input() rating: number = 0.0;
  @Input() player_rating: number = 0;
  @Output() ratingSubmitted = new EventEmitter<number>();

  temp_rating: number = 0;

  submitRating(): void {
    if (this.temp_rating > 10) this.temp_rating = 10;
    else if (this.temp_rating < 1) this.temp_rating = 1;
    this.ratingSubmitted.emit(this.temp_rating);
  }
}
