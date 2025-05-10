import {Component, OnInit} from '@angular/core';
import {GameService} from './components/services/game.service';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    FormsModule,
    NgIf,
    NgClass,
    NgForOf,
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

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.gameService.getGameState(undefined, undefined, this.playerName, undefined, undefined)
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

  moveTile(direction: string): void {
    this.gameService.getGameState(direction, false, this.playerName, undefined, undefined)
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

  reset(): void {
    this.gameService.getGameState(undefined, true, this.playerName, undefined, undefined)
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

  setPlayerName(): void {
    this.playerName = this.tempName;
    localStorage.setItem('playerName', this.playerName); // Сохраняем в localStorage
    this.gameService.getGameState(undefined, false, this.playerName, undefined, undefined)
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
