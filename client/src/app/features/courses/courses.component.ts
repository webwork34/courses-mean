import { ICourse, IResponse } from './../../shared/interfaces';
import { Subscription } from 'rxjs';
import { CoursesService } from './../../services/courses.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MaterialService } from 'src/app/shared/material.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit, OnDestroy {
  courses: ICourse[] = [];
  isLoading = true;

  infoTitle = 'Your list is empty';
  infoText =
    'Please use the <b>"Add new course"</b> button to add your first course';

  addCourse = 'Add new course';

  searchStr?: string;

  aSub: Subscription;
  dSub: Subscription;

  constructor(private coursesService: CoursesService, private router: Router) {}

  ngOnInit(): void {
    this.aSub = this.coursesService.getAll().subscribe(
      (courses: ICourse[]) => {
        this.courses = courses;

        this.isLoading = false;
      },
      (err) => MaterialService.toast(err.error.message)
    );
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }

    if (this.dSub) {
      this.dSub.unsubscribe();
    }
  }

  search(str: string) {
    this.searchStr = str;
  }

  // searchPipe(str: string) {
  //   this.searchStr = str;
  // }

  goToCreatePage() {
    this.router.navigate(['/courses/add']);
  }

  editHandler(id: string) {
    this.router.navigate([`/courses/edit/${id}`]);
  }

  deleteHandler(id: string) {
    this.dSub = this.coursesService.deleteCourse(id).subscribe(
      (data: IResponse) => {
        this.courses = this.courses.filter(
          (course: ICourse) => course._id !== id
        );
        MaterialService.toast(`${data.message}`, 'toast-green');
      },
      (err) => {
        MaterialService.toast(err.error.message);
      }
    );
  }
}
