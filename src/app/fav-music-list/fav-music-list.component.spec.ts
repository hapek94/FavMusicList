import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavMusicListComponent } from './fav-music-list.component';

describe('FavMusicListComponent', () => {
  let component: FavMusicListComponent;
  let fixture: ComponentFixture<FavMusicListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavMusicListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavMusicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
