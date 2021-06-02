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
    // loginForm이 실행되면 login(폼데이터)가 실행
    // /api/post/login loginForm 데이터를 <Token> 타입으로 보냄
    login(user:any): Observable<Token> {
      // console.log('login service \'s users => ', user);
      return this.http.post<Token>('/api/post/login', user)
        // 템플릿에서 값의 표시되는 형태를 변환해서 보여주기 위해서 사용한다.
        .pipe(
          // tap은 별도의 로직을 작성하기위한 연산자
          // 로그를 확인하거나 함수를 호출하기위해 사용
          // server에서 온 res(json형식)에 token 가져와
          // localStorage에 저장
          tap(res => {
            this.setToken(res.token);
          }),
          //
          shareReplay()
        );
    }
    
    // '/api/post/login'온 토큰 로컬 스토리지에 저장
    setToken(token: string): void {
      localStorage.setItem(this.TOKEN_NAME, token);
    }
    logout(): void {
      this.removeToken();
    }

    // 로컬 스토리지 토큰 제거
    removeToken(): void {
      localStorage.removeItem(this.TOKEN_NAME);
    }
    // isAuthenticated() 토큰이 유효한지 체크
    // isTokenExpired()을 통해 토큰이 만료된것이면 true 아니면 false를 준다.
    // 그러나 만료된 토큰을 사용할 수 없다. 즉 true가 아니 false로
    // 바꿔줘야한다. 그래서 !를 붙인다.
    isAuthenticated(): boolean {
      const token = this.getToken();
      return token ? !this.isTokenExpired(token) : false;
    }

    // 로컬 스토리지 토큰 가져오기
    getToken(): any {
      return localStorage.getItem(this.TOKEN_NAME);
    }

    // jwt 모듈을 이용해서 jwt 토큰 유효 여부를 return
    // 유효하면 false 무효하면 true
    isTokenExpired(token: string) {
      return this.jwtHelper.isTokenExpired(token);
    }

    // 로컬 스트로지에 있는 토큰을 가져와
    // 디코딩한 후 저장되어있던 _id 값 가져오기
    getUserid(): string {
      return this.jwtHelper.decodeToken(this.getToken())._id;
    }

    // 로컬 스트로지에 있는 토큰을 가져와
    // 디코딩한 후 저장되어있던 id 값 가져오기
    getSigninId(): string {
      return this.jwtHelper.decodeToken(this.getToken()).id;
    }
}
