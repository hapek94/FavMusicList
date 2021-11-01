import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Album, FavMusicService} from '../fav-music.service';
import {first} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {AlbumValidators} from './album-validators';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-add-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.scss']
})
export class AddAlbumComponent implements OnInit {

  id: string;
  addMode = false;
  album: Album;
  albumForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private favMusicService: FavMusicService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService,
              private translate: TranslateService
  ) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.addMode = !this.id;

    this.createForm();
    if (!this.addMode) {
      this.favMusicService.getById(this.id).pipe(first()).subscribe(album => {
        if (album) {
          album.songList.forEach( () => {
            this.songList.push(this.buildSong());
          });
          this.albumForm.patchValue(album);
        }
      });
    }
  }

  get f() {
    return this.albumForm.controls;
  }

  get songList() {
    return this.albumForm.get('songList') as FormArray;
  }

  buildSong(): FormControl {
    return this.formBuilder.control('', [Validators.required, AlbumValidators.cantContainOnlyWhitespace]);
  }
  addSong() {
    this.songList.push(this.buildSong());
  }
  deleteSong(index: number): void {
    this.songList.removeAt(index);
  }


  createForm(): void {
    this.albumForm = this.formBuilder.group({
      name: ['', [Validators.required, AlbumValidators.cantContainOnlyWhitespace]],
      author: ['', [Validators.required, AlbumValidators.cantContainOnlyWhitespace]],
      releaseDate: ['', [Validators.required]],
      songList: this.formBuilder.array([this.buildSong()]),
      isBest: [false],
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.albumForm.invalid) {
      return;
    }
    if (this.addMode) {
      this.createAlbum();
    } else {
      this.updateAlbum();
    }
  }

  createAlbum(): void {
    this.favMusicService.create(this.albumForm.value).pipe(first()).subscribe(res => {
      if (res.status === 200) {
        this.toastr.success(this.translate.instant('Album created successfully!'));
        this.router.navigate(['/']);
      } else {
        this.toastr.error(this.translate.instant('Unexpected error!'));
      }
    });
  }

  updateAlbum(): void {
    this.favMusicService.update(this.id, this.albumForm.value).pipe(first()).subscribe(res => {
      if (res.status === 200) {
        this.toastr.success(this.translate.instant('Album updated successfully!'));
        this.router.navigate(['/']);
      } else {
        this.toastr.error(this.translate.instant('Unexpected error!'));
      }
    });
  }
}
