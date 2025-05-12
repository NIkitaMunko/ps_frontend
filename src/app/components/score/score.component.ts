import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'score-component',
  imports: [
    FormsModule,
    NgForOf,
  ],
  templateUrl: './score.component.html',
  styleUrl: './score.component.scss'
})
export class ScoreComponent {
  @Input() scores: any[] = [];
  @Input() playerScore: number = 0;

  formatDate(dateString: string): string {
    const [date, time] = dateString.split('T');
    return `${date.replaceAll("-", ".")} ${time.slice(0, 5)}`;
  }

}
