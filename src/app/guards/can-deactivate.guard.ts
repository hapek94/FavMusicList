import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AddAlbumComponent} from '../add-album/add-album.component';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<AddAlbumComponent>  {
  canDeactivate(component: AddAlbumComponent): boolean {
    if (component.albumForm.dirty && !component.submitted)  {
      console.log(component.albumForm.dirty, component.albumForm.status, component.albumForm.dirty, component.albumForm.value.id);

      return confirm('Warning: Are you sure you want to discard all changes?');
    }
    return true;
  }
}
