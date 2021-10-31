import {AbstractControl, ValidationErrors} from '@angular/forms';

export class AlbumValidators {
  static cantContainOnlyWhitespace(control: AbstractControl): ValidationErrors | null {
    if (!(control.value as string).trim().length) {
      return { cantContainOnlyWhitespace: true };
    }
    return null;
  }
}
