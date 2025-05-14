import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'comment-component',
  imports: [FormsModule, NgForOf],
  templateUrl: './comment.component.html',
  standalone: true,
  styleUrl: './comment.component.scss'
})
export class CommentComponent {
  @Input() comments: any[] = [];
  @Input() playerName: string | undefined;
  @Output() commentSubmitted = new EventEmitter<string>();

  playerComment: string = '';

  submitComment(): void {
    if (this.playerComment.trim()) {
      this.commentSubmitted.emit(this.playerComment);
      this.playerComment = '';
    }
  }
}
