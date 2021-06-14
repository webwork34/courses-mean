import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'courses-app';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const potentialToken = localStorage.getItem('auth-token');

    if (potentialToken) {
      this.authService.setToken(potentialToken);
    }
  }
}
