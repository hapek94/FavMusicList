import { Component, OnInit } from '@angular/core';
import {Album, FavMusicService} from '../fav-music.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-fav-music-list',
  templateUrl: './fav-music-list.component.html',
  styleUrls: ['./fav-music-list.component.scss']
})
export class FavMusicListComponent implements OnInit {

  albums: Album[];
  dataCopy = [];

  filter: string;

  pageIndex: 1;

  constructor(private favMusicService: FavMusicService) {
  }

  ngOnInit(): void {
    this.favMusicService.getAll().pipe(first()).subscribe(albums => {
      this.albums = albums;
      this.dataCopy = albums;
    });
  }
  onPageChange(page): void {
    this.pageIndex = page;
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
  deleteAlbum(id: string) {
    if (confirm('Are you sure you want to delete this album?')) {

      this.favMusicService.delete(id).pipe(first()).subscribe(res => {
        if (res.status === 200) {
          this.albums = this.albums.filter(album => album.id !== id);
        }
      });
    }
  }

  addToBest(album: Album) {
    album.isBest = !album.isBest;
    this.favMusicService.update(album.id, album).pipe(first()).subscribe(res => console.log(res));
  }

  filterList(): void {
    this.albums = [...this.dataCopy];
    if (this.filter) {
      this.albums = this.dataCopy.filter(elem => elem.name.toLowerCase().includes(this.filter.toLowerCase()) ||
        elem.author.toLowerCase().includes(this.filter.toLowerCase()));
      this.pageIndex = 1;
    }
  }
}
