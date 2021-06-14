import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ButtonComponent,
  SearchComponent,
  HeaderComponent,
  InfoComponent,
  ModalComponent,
  WindowComponent,
} from './components';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmailValidatorDirective } from './validators/email-validator.directive';
import { ToggleDirective } from './directives/toggle.directive';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AppRoutingModule } from './../app-routing.module';
import { SiteLayoutComponent } from './layouts/site-layout/site-layout.component';

const COMPONENTS = [
  ButtonComponent,
  HeaderComponent,
  InfoComponent,
  SearchComponent,
  ModalComponent,
  WindowComponent,
  EmailValidatorDirective,
  ToggleDirective,
  AuthLayoutComponent,
  SiteLayoutComponent,
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  exports: COMPONENTS,
})
export class SharedModule {}
