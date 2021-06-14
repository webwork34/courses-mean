import { ChoosenCourseComponent } from './features/choosen-course/choosen-course.component';
import { CourseEditComponent } from './features/course-edit/course-edit.component';
import { CoursesComponent } from './features/courses/courses.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { NgModule } from '@angular/core';
import { LoginComponent } from './features/login/login.component';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './features/registration/registration.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistrationComponent },
    ],
  },
  {
    path: '',
    component: SiteLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'courses', component: CoursesComponent },
      { path: 'courses/add', component: CourseEditComponent },
      { path: 'courses/edit/:id', component: CourseEditComponent },
      { path: 'courses/:id', component: ChoosenCourseComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
