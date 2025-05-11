import {Component, OnInit} from '@angular/core';
import {GameService} from './services/game.service';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CommentComponent} from './components/comment/comment.component';
import {RatingComponent} from './components/rating/rating.component';
import {RegisterFormComponent} from './components/register-form/register-form.component';
import {ControlsComponent} from './components/controls/controls.component';
import {ScoreComponent} from './components/score/score.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    FormsModule,
    NgIf,
    NgClass,
    NgForOf,
    CommentComponent,
    RatingComponent,
    RegisterFormComponent,
    ControlsComponent,
    ScoreComponent
  ],
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  field: string[][] = [];
  frameNumbers: number[][] = [];
  isSolved: boolean;

  rating: number;
  comments: any[] = [];

  scores: any[] = [];
  best_player_score: number = 0;
  temp_player_score: number = 1000;

  player_name: string;
  player_rating: number;

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
    this.loadGameData();
  }

  onDirectionSubmitted(direction: string): void {
    if (this.temp_player_score > 0) this.temp_player_score--;
    this.loadGameData({direction, field: this.field});
  }

  onResetSubmitted(): void {
    this.loadGameData({reset: true});
  }

  onPlayerNameSubmitted(player_name: string): void {
    this.player_name = player_name;
    this.loadGameData({field: this.field});
  }

  onRatingSubmitted(player_rating: number): void {
    this.player_rating = player_rating;
    this.loadGameData({rating: player_rating.toString(), field: this.field});
  }

  onCommentSubmitted(comment: string): void {
    this.loadGameData({comment, field: this.field});
  }


  loadGameData(params: {
    direction?: string;
    reset?: boolean;
    comment?: string;
    rating?: string;
    field?: string[][]
    score?: string
  } = {}) {
    this.gameService.getGameState(params.direction, params.reset || false, this.player_name, params.comment, params.rating, params.field, params.score)
      .subscribe((data) => {
          this.field = data.field;
          this.frameNumbers = data.frameNumbers;
          this.isSolved = data.isSolved;
          this.rating = data.rating;
          this.player_rating = data.player_rating;
          this.player_name = data.playerName;
          this.comments = data.comments;
          this.scores = data.scores;

          if (this.isSolved) {
            this.onWin();
          } else this.setPlayerBestScore();
        },
      );
  }

  setPlayerBestScore(): void {
    const playerScores = this.scores.filter(score => score.player === this.player_name);

    if (playerScores.length > 0) {
      let highestScore = playerScores[0].points;

      for (let i = 0; i < playerScores.length; i++) {
        const currentScore = playerScores[i].points;
        if (currentScore > highestScore) highestScore = currentScore;
      }

      this.best_player_score = highestScore;
    } else
      this.best_player_score = 0;
  }

  onWin(): void {
    this.best_player_score = this.temp_player_score;
    this.loadGameData({score: this.best_player_score.toString(), field: this.field, reset: true});
    this.temp_player_score = 1000;
  }
}
