import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {GameComment} from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  constructor(protected http: HttpClient) {}

  getAll() : Observable<GameComment[]> {
    return this.http.get<GameComment[]>('http://localhost:8080/api/comment/picture_sliding', {
      params: new HttpParams().append('limit', '5'),
    })
  }
}
