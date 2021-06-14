import { Subscription } from 'rxjs';
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CustomValidators } from './../../shared/validators/custom.validators';
import { CoursesService } from './../../services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialService } from 'src/app/shared/material.service';
import { ICourse, IResponse } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss'],
})
export class CourseEditComponent implements OnInit, OnDestroy {
  form: FormGroup;

  @ViewChild('newAuthor') newAuthorRef: ElementRef;

  duration: number;

  button = 'button';
  submit = 'submit';
  createCourse = 'Create course';
  createAuthor = 'Create author';
  deleteAuthor = 'Delete author';
  goBack = 'Go Back';
  emptyAuthor = true;
  gSub: Subscription;
  cSub: Subscription;
  eSub: Subscription;

  courseId = '';

  constructor(
    private fb: FormBuilder,
    private coursesService: CoursesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.courseId = this.route.snapshot.params.id;

    this.form = this.fb.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      duration: [null, [Validators.required, Validators.min(0)]],
      newAuthor: ['', [CustomValidators.latinLettersAndNumbers]],
      authors: this.fb.array([]),
    });

    if (this.route.snapshot.url[1].path !== 'add') {
      this.createCourse = 'Edit course';

      this.gSub = this.coursesService.getCourse(this.courseId).subscribe(
        (course: ICourse) => {
          this.form.controls.title.setValue(course.title);
          this.form.controls.description.setValue(course.description);
          this.form.controls.duration.setValue(course.duration);

          if (course.authors.length) {
            course.authors.forEach((author) => {
              if (author !== 'No authors') {
                this.getAuthors.push(this.fb.control(author));
              }
            });
          }
        },
        (err) => {
          MaterialService.toast(err.error.message);
        }
      );
    }
  }

  ngOnDestroy() {
    if (this.gSub) {
      this.gSub.unsubscribe();
    }

    if (this.cSub) {
      this.cSub.unsubscribe();
    }

    if (this.eSub) {
      this.eSub.unsubscribe();
    }
  }

  get getAuthors() {
    return this.form.get('authors') as FormArray;
  }

  checkInputValue(item: any) {
    if (item.value.trim()) {
      this.emptyAuthor = false;
    } else {
      this.emptyAuthor = true;
    }
  }

  addAuthor() {
    if (this.newAuthorRef.nativeElement.value.trim()) {
      (<FormArray>this.form.controls.authors).push(
        new FormControl(this.newAuthorRef.nativeElement.value)
      );

      this.newAuthorRef.nativeElement.value = '';
      this.emptyAuthor = true;
    }
  }

  removeAuthor(indx: number) {
    (<FormArray>this.form.controls.authors).removeAt(indx);
  }

  goToCoursesList() {
    this.form.reset();
    this.router.navigate(['/courses']);
  }

  onSubmit() {
    const course = {
      title: this.form.value.title,
      description: this.form.value.description,
      authors: this.form.value.authors.length
        ? this.form.value.authors
        : 'No authors',
      duration: this.form.value.duration,
    };

    if (this.route.snapshot.url[1].path === 'add') {
      this.coursesService.createCourse(course).subscribe(
        (data: IResponse) => {
          MaterialService.toast(`${data.message}`, 'toast-green');
          this.form.controls.authors = this.fb.array([]);
          this.form.reset();
        },
        (err) => {
          MaterialService.toast(err.error.message);
        }
      );
    } else {
      this.eSub = this.coursesService
        .editCourse(course, this.courseId)
        .subscribe(
          (data: IResponse) => {
            MaterialService.toast(`${data.message}`, 'toast-green');
            this.router.navigate(['/courses']);
            this.form.controls.authors = this.fb.array([]);
            this.form.reset();
          },
          (err) => {
            MaterialService.toast(err.error.message);
          }
        );
    }
  }
}
