import {
  Component,
  DoCheck,
  Input,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { ICourse } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss'],
})
export class CourseComponent implements OnInit, DoCheck {
  @Input() courses: ICourse[];
  @Input() searchStr?: string;

  @Output() onDelete = new EventEmitter<string>();
  @Output() onEdit = new EventEmitter<string>();

  savedCorces: ICourse[];

  showCourseBtn = 'Show Course';

  faPen = faPen;
  faTrash = faTrash;

  showBtn = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.savedCorces = this.courses;
  }

  ngDoCheck() {
    if (this.searchStr) {
      this.courses = this.courses.filter((course) =>
        course.title.toLowerCase().includes(this.searchStr.toLowerCase())
      );
    } else if (this.searchStr === '') {
      this.courses = this.savedCorces;
    }
  }

  showCourse(id: string) {
    this.router.navigate([`courses/${id}`]);
  }

  editCourse(id: string) {
    this.onEdit.emit(id);
  }

  deleteCourse(id: string) {
    this.onDelete.emit(id);
  }
}
