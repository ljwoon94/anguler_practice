import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { Token } from '../models/token';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  TOKEN_NAME = 'jwt_token';

  constructor(
      private http: HttpClient,
      private jwtHelper: JwtHelperService
    ) { }

    login(user:any): Observable<Token> {
      // console.log('login service \'s users => ', user);
      return this.http.post<Token>('/api/post/login', user)
        .pipe(
          tap(res => {
            // console.log('login service tap res => ');
            // console.log(res);
            this.setToken(res.token);
          }),
          shareReplay()
        );
    }
    
    setToken(token: string): void {
      localStorage.setItem(this.TOKEN_NAME, token);
    }

    logout(): void {
      this.removeToken();
    }

    removeToken(): void {
      localStorage.removeItem(this.TOKEN_NAME);
    }

    isAuthenticated(): boolean {
      const token = this.getToken();
      return token ? !this.isTokenExpired(token) : false;
    }

    getToken(): any {
      return localStorage.getItem(this.TOKEN_NAME);
    }

    isTokenExpired(token: string) {
      return this.jwtHelper.isTokenExpired(token);
    }

    getUserid(): string {
      return this.jwtHelper.decodeToken(this.getToken())._id;
    }
    getSigninId(): string {
      return this.jwtHelper.decodeToken(this.getToken()).id;
    }
}
