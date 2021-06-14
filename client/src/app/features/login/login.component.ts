import { Component, OnInit } from '@angular/core';
import { User } from './../../shared/user';
import { NgForm } from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialService } from 'src/app/shared/material.service';
import jwt_decode from 'jwt-decode';
import { IUser } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  submit = 'submit';
  Login = 'Login';
  user: User = new User();
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showEye = true;
  aSub: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  changeVisability() {
    this.showEye = !this.showEye;
  }

  goToRegister() {
    this.router.navigate(['/registration']);
  }

  onSubmit(loginForm: NgForm) {
    this.aSub = this.authService.login(this.user).subscribe(
      ({ jwt_token }) => {
        const [, token] = jwt_token.split(' ');
        const decoded: IUser = jwt_decode(token);

        localStorage.setItem('userName', decoded.name);

        this.router.navigate(['/courses']);
        loginForm.reset();
      },
      (err) => {
        MaterialService.toast(err.error.message);
      }
    );
  }
}
