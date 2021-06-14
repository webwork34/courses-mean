import { Pipe, PipeTransform } from '@angular/core';
import { ICourse } from '../interfaces';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(courses: ICourse[], search: string = ''): ICourse[] {
    if (!search.trim()) {
      return courses;
    }

    return courses.filter((course: ICourse) =>
      course.title.toLowerCase().includes(search.toLowerCase())
    );
  }
}
