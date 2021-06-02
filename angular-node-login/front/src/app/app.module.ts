import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { BoardComponent } from './board/board.component';
import { JwtModule } from '@auth0/angular-jwt';
import { environment as env } from '../environments/environment';
import { AuthGuardService, AuthRedirect } from './services/auth-guard.service';

const TOKEN_NAME = env.tokenName;

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
			config: {
				// https://github.com/auth0/angular2-jwt
        // tokenGetter은 로컬 스토리지에 토큰 값을 불러와
        // 인증 된 요청(allowedDomains:[])은 알고 있고 
        // 신뢰할 수있는 도메인에게 전송
				tokenGetter,
				// allowedDomains: [],
				// disallowedRoutes: [/api\/v1\/auth.*/] ---> regex는 --prod에서 오류 발생.
				// disallowedRoutes 특정 경로에 대한 인증 헤더를 바꾸지 않으려면 여기에 나열
        disallowedRoutes: [
					'/api/post/login',
					'/api/post/signup',
				]
			}
		}),
  ],
  providers: [AuthGuardService,AuthRedirect],
  bootstrap: [AppComponent]
})
export class AppModule { }

/*-------------------------------------------------
	Token 관련 : ng build --prod의 경우를 위해 필요
	https://github.com/auth0/angular2-jwt/issues/401
	https://github.com/auth0/angular2-jwt/issues/602
--------------------------------------------------*/

export function tokenGetter() {
	return localStorage.getItem(TOKEN_NAME);
}