import { Component } from '@angular/core';
import {Observable} from 'rxjs';
import {GameComment} from './components/models/comment';
import {CommentsService} from './components/services/comment.service';
import {ProductComponent} from './components/commetns/comment.component';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    ProductComponent,
    NgIf,
    NgForOf,
    AsyncPipe
  ],
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'picture_sliding';
  comments$: Observable<GameComment[]>;

  constructor(private commentsService: CommentsService) {}

  ngOnInit(): void {
    this.comments$ = this.commentsService.getAll()
  }
}
