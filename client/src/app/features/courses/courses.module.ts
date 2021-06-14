import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { SharedModule } from './../../shared/shared.module';
import { CourseModule } from './../course/course.module';
import { LoginModule } from './../login/login.module';
import { RegistrationModule } from './../registration/registration.module';
import { CourseEditModule } from './../course-edit/course-edit.module';

@NgModule({
  declarations: [CoursesComponent],
  imports: [
    CommonModule,
    SharedModule,
    CourseModule,
    LoginModule,
    RegistrationModule,
    CourseEditModule,
  ],
  exports: [CoursesComponent],
})
export class CoursesModule {}
