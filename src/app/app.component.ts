import {Component, OnInit} from '@angular/core';
import {GameService} from './components/services/game.service';
import {DecimalPipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    FormsModule,
    NgIf,
    NgClass,
    NgForOf,
    DecimalPipe,
  ],
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'picture_sliding';

  field: string[][] = [];
  frameNumbers: number[][] = [];
  isSolved: boolean;
  rating: number;
  comments: any[] = [];

  player_name: string;
  temp_name: string;

  player_rating: number;
  temp_rating: number = 0;

  player_comment: string;

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
    this.loadGameData();
  }

  moveTile(direction: string): void {
    this.loadGameData({ direction, field: this.field });
  }

  reset(): void {
    this.loadGameData({reset: true});
  }

  setPlayerName(): void {
    this.player_name = this.temp_name;
    this.loadGameData({ field: this.field });
  }

  submitRating(): void {
    if (this.temp_rating > 10) this.temp_rating = 10;
    else if (this.temp_rating < 1) this.temp_rating = 1;
    this.player_rating = this.temp_rating;
    this.loadGameData({ rating: this.player_rating.toString(), field: this.field });
  }

  submitComment(): void {
    this.loadGameData({ comment: this.player_comment, field: this.field });
    this.player_comment = '';
  }

  private loadGameData(params: { direction?: string; reset?: boolean; comment?: string; rating?: string; field?: string[][] } = {}) {
    this.gameService.getGameState(params.direction, params.reset || false, this.player_name, params.comment, params.rating, params.field)
      .subscribe(
        (data) => {
          this.field = data.field;
          this.frameNumbers = data.frameNumbers;
          this.isSolved = data.isSolved;
          this.rating = data.rating;
          this.player_rating = data.player_rating;
          this.player_name = data.playerName;
          this.comments = data.comments;
        },
      );
  }
}
