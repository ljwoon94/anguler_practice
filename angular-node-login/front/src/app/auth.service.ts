import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  login(id:string, password:string) {
      return this.httpClient.post<{access_token:  string}>('http://localhost:3000/auth/login', {id, password}).pipe(tap(res => {
      localStorage.setItem('access_token', res.access_token);
    }))
  }

  register(id:string, password:string) {
      return this.httpClient.post<{access_token: string}>('http://localhost:3000/auth/register', {id, password}).pipe(tap(res => {
      this.login(id, password)
    }))
  }
  logout() {
    localStorage.removeItem('access_token');
  }
  public get loggedIn(): boolean{
    return localStorage.getItem('access_token') !==  null;
  }

}
