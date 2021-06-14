import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseComponent } from './course.component';
import { CustomPipesModule } from './../../shared/pipes/custom-pipes.module';
import { SharedModule } from './../../shared/shared.module';

@NgModule({
  declarations: [CourseComponent],
  imports: [CommonModule, SharedModule, CustomPipesModule],
  exports: [CourseComponent],
})
export class CourseModule {}
