import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './login.component';
import { SharedModule } from './../../shared/shared.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, FormsModule, SharedModule, FontAwesomeModule],
  exports: [LoginComponent],
})
export class LoginModule {}
