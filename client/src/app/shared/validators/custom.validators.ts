import { FormControl } from '@angular/forms';

export class CustomValidators {
  static latinLettersAndNumbers(
    control: FormControl
  ): { [key: string]: boolean } | null {
    const patt = /^[a-zA-Z0-9\s]+$/;

    if (!patt.test(control.value) && control.value) {
      return {
        onlyLatinLettersAndNumbers: true,
      };
    }

    return null;
  }
}
