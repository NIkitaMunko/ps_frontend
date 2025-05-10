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

  values: string[][] = [];
  frameNumbers: number[][] = [];
  isSolved: boolean;
  rating: number;
  player_rating: number;
  playerName: string;
  tempName: string;
  currentRating: number = 0;

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
    this.loadGameData();
  }

  moveTile(direction: string): void {
    this.loadGameData({direction});
  }

  reset(): void {
    this.loadGameData({reset: true});
  }

  setPlayerName(): void {
    this.playerName = this.tempName;
    this.loadGameData();
  }

  submitRating(): void {
    if (this.currentRating > 10) this.currentRating = 10;
    else if (this.currentRating < 1) this.currentRating = 1;
    this.player_rating = this.currentRating;
    this.loadGameData({rating: this.player_rating.toString()});
  }

  private loadGameData(params: { direction?: string; reset?: boolean; comment?: string; rating?: string; } = {}) {
    this.gameService.getGameState(params.direction, params.reset || false, this.playerName, params.comment, params.rating)
      .subscribe(
        (data) => {
          this.values = data.field;
          this.frameNumbers = data.frameNumbers;
          this.isSolved = data.isSolved;
          this.rating = data.rating;
          this.player_rating = data.player_rating;
          this.playerName = data.playerName;
        },
      );
  }
}
