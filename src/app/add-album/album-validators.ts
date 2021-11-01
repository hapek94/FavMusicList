import {AbstractControl, ValidationErrors} from '@angular/forms';

export class AlbumValidators {
  static cantContainOnlyWhitespace(control: AbstractControl): ValidationErrors | null {
    if (!(control.value as string).trim().length) {
      return {cantContainOnlyWhitespace: true};
    }
    return null;
  }

  static mustContainAtLeastOneSong(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return {cantContainOnlyWhitespace: true};

      // const empty = (control.value as []).filter(value => !value);
      // if (empty.length !== control.value.length) {
      //   return {cantContainOnlyWhitespace: true};
      // }
      return null;
    }
  }
}
