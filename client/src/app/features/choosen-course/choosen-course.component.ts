import { Subscription } from 'rxjs';
import { CoursesService } from './../../services/courses.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICourse } from 'src/app/shared/interfaces';
import { MaterialService } from 'src/app/shared/material.service';

@Component({
  selector: 'app-choosen-course',
  templateUrl: './choosen-course.component.html',
  styleUrls: ['./choosen-course.component.scss'],
})
export class ChoosenCourseComponent implements OnInit, OnDestroy {
  goBackBtn = 'Go back';
  sSub: Subscription;
  course: ICourse;
  isLoading = true;

  constructor(
    private router: Router,
    private coursesService: CoursesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const courseId = this.route.snapshot.params.id;

    this.coursesService.getCourse(courseId).subscribe(
      (course: ICourse) => {
        this.course = course;
        this.isLoading = false;
      },
      (err) => {
        MaterialService.toast(err.error.message);
      }
    );
  }

  ngOnDestroy() {
    if (this.sSub) {
      this.sSub.unsubscribe();
    }
  }

  goBack() {
    this.router.navigate(['/courses']);
  }
}
