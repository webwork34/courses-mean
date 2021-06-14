import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CourseEditComponent } from './course-edit.component';
import { SharedModule } from './../../shared/shared.module';
import { CustomPipesModule } from './../../shared/pipes/custom-pipes.module';

@NgModule({
  declarations: [CourseEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    CustomPipesModule,
  ],
  exports: [CourseEditComponent],
})
export class CourseEditModule {}
