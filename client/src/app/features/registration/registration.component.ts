import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { MaterialService } from 'src/app/shared/material.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit, OnDestroy {
  submit = 'submit';
  form: FormGroup;
  Registration = 'Registration';
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showEye = true;
  aSub: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

  changeVisability() {
    this.showEye = !this.showEye;
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  onSubmit() {
    this.form.disable();

    this.aSub = this.authService.register(this.form.value).subscribe(
      () => {
        MaterialService.toast('User was created successfuly', 'toast-green');
        this.router.navigate(['/login']);
        this.form.reset();
      },
      (err) => {
        MaterialService.toast(err.error.message);
        this.form.enable();
      }
    );
  }
}
