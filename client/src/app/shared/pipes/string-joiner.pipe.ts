import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringJoiner',
})
export class StringJoinerPipe implements PipeTransform {
  transform(arr: [string], separator: string): unknown {
    if (!arr) {
      return null;
    }

    return arr.join(separator);
  }
}
