import { Injectable } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {v4 as uuid} from 'uuid';
import {Album} from '../fav-music.service';

const key = 'albumKey';
const albumJSON = localStorage.getItem(key);
let albums: Album[] = albumJSON ? JSON.parse(albumJSON) : [{
  id: '1',
  author: 'Łukasz Hapek',
  name: 'Test',
  isBest: true,
  releaseDate: '2021-09-28'
}];

@Injectable()
export class BackendProvider implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const {url, method, body} = request;

    return handleRoute();

    // Routes handler
    function handleRoute() {
      switch (true) {
        case url.endsWith('/albums') && method === 'GET':
          return getAlbums();
        case url.match(/\/albums\/.+$/) && method === 'GET':
          return getAlbumsById();
        case url.endsWith('/albums') && method === 'POST':
          return createAlbum();
        case url.match(/\/albums\/.+$/) && method === 'PUT':
          return updateAlbum();
        case url.match(/\/albums\/.+$/) && method === 'DELETE':
          return deleteAlbum();
        default:
          return next.handle(request);
      }
    }

    function getAlbums() {
      return ok(albums.map(x => basicDetails(x)));
    }

    function getAlbumsById() {
      const user = albums.find(x => x.id === idFromUrl());
      return ok(basicDetails(user));
    }

    function createAlbum() {
      const album = body;

      album.id = uuid();

      album.name.trim();
      album.author.trim();

      albums.push(album);
      localStorage.setItem(key, JSON.stringify(albums));

      return ok();
    }
    function updateAlbum() {
      const params = body;

      params.name.trim();
      params.author.trim();

      const album = albums.find(x => x.id === idFromUrl());

      Object.assign(album, params);
      localStorage.setItem(key, JSON.stringify(albums));

      return ok();
    }

    function deleteAlbum() {
      albums = albums.filter(x => x.id !== idFromUrl());
      localStorage.setItem(key, JSON.stringify(albums));
      return ok();
    }

    function ok(body?: any) {
      return of(new HttpResponse({status: 200, body}));
    }

    function basicDetails(album) {
      const {id, name, releaseDate, author, isBest} = album;
      return {id, name, releaseDate, author, isBest};
    }

    function idFromUrl() {
      const urlParts = url.split('/');
      return urlParts[urlParts.length - 1];
    }
  }
}

export const backendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: BackendProvider,
  multi: true
};
