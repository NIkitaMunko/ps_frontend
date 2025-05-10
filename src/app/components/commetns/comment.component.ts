import {Component, Input} from '@angular/core'
import {GameComment} from '../models/comment';

@Component({
  selector: 'app-product',
  templateUrl: './comment.component.html',
  imports: []
})
export class ProductComponent {
  @Input() comment: GameComment;
}
