import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from 'src/app/shared/interfaces';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token = null;

  constructor(private http: HttpClient) {}

  register(user: IUser): Observable<IUser> {
    return this.http.post<IUser>('api/registration', user);
  }

  login(user: IUser): Observable<{ jwt_token: string }> {
    return this.http.post<{ jwt_token: string }>('/api/login', user).pipe(
      tap(({ jwt_token }) => {
        localStorage.setItem('auth-token', jwt_token);
        this.setToken(jwt_token);
      })
    );
  }

  setToken(token: string) {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  logout() {
    this.setToken(null);
    localStorage.clear();
  }
}
