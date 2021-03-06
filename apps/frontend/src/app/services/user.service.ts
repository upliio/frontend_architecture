import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {shareReplay} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {UserEntity} from '@upli/shared';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: Observable<UserEntity>;

  constructor(private http: HttpClient) {
  }

  login = (credentials: { username: string, password: string }) => this.http.post<{ token: string }>(`/api/auth/login`, credentials);

  getToken = () => localStorage.getItem('token');

  setToken = (token: string) => {
    this.resetUser();
    localStorage.setItem('token', token);
  }

  currentUser = () => {
    if (this.user == null) {
      this.user = this.getToken() ? this.http.get<UserEntity>(`/api/user/self`).pipe(shareReplay(1)) : of(null);
    }
    return this.user;
  };

  resetUser = () => this.user = null;

  logout() {
    this.http.post(`/api/auth/logout`, {}).subscribe(res => {
    });
    this.user = of(null);
    localStorage.removeItem('token');
    location.href = '/';
  }

  checkIfUsernameIsAvailable = (username: string) => this.http.post<boolean>(`/api/utils/checkUsername`, username);
  checkIfEmailIsAvailable = (email: string) => this.http.post<boolean>(`/api/utils/checkEmail`, email);

  register = (details: any) => this.http.post<{ token: string }>(`/api/auth/register`, details);
}

