import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minTransform',
})
export class MinTransformPipe implements PipeTransform {
  transform(value: number, type: string): string {
    if (!value) {
      return null;
    }

    const hourStr = Math.floor(value / 60) <= 1 ? 'hour' : 'hours';
    const hours =
      Math.floor(value / 60).toString().length === 1
        ? `0${Math.floor(value / 60)}`
        : `${Math.floor(value / 60)}`;

    const minutes =
      (value % 60).toString().length === 1 ? `0${value % 60}` : `${value % 60}`;
    const minStr = minutes === '01' ? 'minute' : 'minutes';

    if (type === 'HM') {
      return `${hours} ${hourStr} ${minutes} ${minStr}`;
    }

    return `${hours}:${minutes} ${hourStr}`;
  }
}
