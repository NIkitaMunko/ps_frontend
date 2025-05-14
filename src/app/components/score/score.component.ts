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
  standalone: true,
  styleUrl: './score.component.scss'
})
export class ScoreComponent {
  @Input() scores: any[] = [];
  @Input() playerScore: number = 0;

  formatDate(dateString: string): string {
    const [date, time] = dateString.split('T');
    const [hours, minutes] = time.slice(0, 5).split(':');
    let newHours = parseInt(hours) + 2;
    if (newHours >= 24) newHours -= 24;
    return `${date.replaceAll("-", ".")} ${newHours}:${minutes}`;
  }

}
