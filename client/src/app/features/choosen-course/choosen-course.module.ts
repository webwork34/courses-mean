import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChoosenCourseComponent } from './choosen-course.component';
import { SharedModule } from './../../shared/shared.module';
import { CustomPipesModule } from './../../shared/pipes/custom-pipes.module';

@NgModule({
  declarations: [ChoosenCourseComponent],
  imports: [CommonModule, SharedModule, CustomPipesModule],
  exports: [ChoosenCourseComponent],
})
export class ChoosenCourseModule {}
