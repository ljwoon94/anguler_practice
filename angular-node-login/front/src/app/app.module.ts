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
				tokenGetter,
				// allowedDomains: [],
				// disallowedRoutes: [/api\/v1\/auth.*/] ---> regex는 --prod에서 오류 발생.
				disallowedRoutes: [
					'/api/login',
					'/api/signup',
				]
			}
		}),
  ],
  providers: [],
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