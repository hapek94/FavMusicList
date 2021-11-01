import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

const baseUrl = `${environment.apiUrl}/albums`;

@Injectable({
  providedIn: 'root'
})

export class FavMusicService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Album[]>(baseUrl);
  }
  create(params: any) {
    return this.http.post(baseUrl, params, {
      observe: 'response',
    });
  }
  getById(id: string) {
    return this.http.get<Album>(`${baseUrl}/${id}`);
  }
  delete(id: string) {
    return this.http.delete(`${baseUrl}/${id}`, {
      observe:  'response',
    });
  }
  update(id: string, params) {
    return this.http.put(`${baseUrl}/${id}`, params , {
      observe:  'response',
    });
  }
}
export interface Album {
  id: string;
  name: string;
  author: string;
  releaseDate: Date;
  songList: [{song: string}];
  isBest: boolean;
}
