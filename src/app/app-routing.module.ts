import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FavMusicListComponent} from './fav-music-list/fav-music-list.component';
import {AddAlbumComponent} from './add-album/add-album.component';
import {CanDeactivateGuard} from './guards/can-deactivate.guard';

const routes: Routes = [
 { path: 'addalbum', component: AddAlbumComponent, canDeactivate: [CanDeactivateGuard]  },
 { path: 'editalbum/:id', component: AddAlbumComponent, canDeactivate: [CanDeactivateGuard] },
 { path: '**', component: FavMusicListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
