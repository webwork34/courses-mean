import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MinTransformPipe } from './min-transform.pipe';
import { StringJoinerPipe } from './string-joiner.pipe';
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [MinTransformPipe, StringJoinerPipe, FilterPipe],
  imports: [CommonModule],
  exports: [MinTransformPipe, FilterPipe],
})
export class CustomPipesModule {}
