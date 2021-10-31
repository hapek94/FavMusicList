import { TestBed } from '@angular/core/testing';

import { FavMusicService } from './fav-music.service';

describe('FavMusicService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FavMusicService = TestBed.get(FavMusicService);
    expect(service).toBeTruthy();
  });
});
