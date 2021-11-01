import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AddAlbumComponent} from '../add-album/add-album.component';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<AddAlbumComponent>  {

  constructor( private translate: TranslateService) {

  }
  canDeactivate(component: AddAlbumComponent): boolean {

    if (component.albumForm.dirty && !component.submitted)  {

      return confirm(this.translate.instant( 'Warning: Are you sure you want to discard all changes?'));
    }
    return true;
  }
}
