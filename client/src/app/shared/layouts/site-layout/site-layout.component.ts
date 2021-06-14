import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss'],
})
export class SiteLayoutComponent implements OnInit {
  logOut = 'Logout';
  name: string = 'Test name';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.name = localStorage.getItem('userName') || 'user';
  }

  logout(): void {
    this.router.navigate(['/']);
    this.authService.logout();
  }
}
