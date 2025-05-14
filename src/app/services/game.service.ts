import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private apiUrl = 'http://localhost:8080//api/picturesliding';

  constructor(private http: HttpClient) {
  }

  getGameState(
    direction: string = '', reset: boolean = false, playerName: string = '', playerPass: string = '', comment: string = '', rating: string = '', field?: string[][], score: string = ''
  ): Observable<any> {
    let params = new HttpParams()
      .set('direction', direction)
      .set('reset', reset.toString())
      .set('playerName', playerName)
      .set('playerPass', playerPass)
      .set('comment', comment)
      .set('rating', rating)
      .set('score', score);
    return this.http.post(this.apiUrl, {field}, {params});
  }
}
