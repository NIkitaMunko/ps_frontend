import {Component, OnInit} from '@angular/core';
import {GameService} from './services/game.service';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CommentComponent} from './components/comment/comment.component';
import {RatingComponent} from './components/rating/rating.component';
import {RegisterFormComponent} from './components/register-form/register-form.component';

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
    RegisterFormComponent
  ],
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  field: string[][] = [];
  frameNumbers: number[][] = [];
  isSolved: boolean;
  rating: number;
  comments: any[] = [];

  player_name: string;

  player_rating: number;

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
    this.loadGameData();
  }

  moveTile(direction: string): void {
    this.loadGameData({direction, field: this.field});
  }

  reset(): void {
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
  } = {}) {
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
