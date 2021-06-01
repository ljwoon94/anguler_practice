import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';


import { AuthGuard, AuthRedirect } from './guards/auth.guard';
import { JwtModule, JwtInterceptor } from '@auth0/angular-jwt';
import { RefreshTokenInterceptor } from './services/refresh-token-interceptor';


import { AppComponent } from './app.component';
import { BookComponent } from './book/book.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const appRoutes: Routes = [
	{
		path: 'books',
		component: BookComponent,
		canActivate: [AuthGuard],
		data: { title: 'Book List' }
	},
	{
		path: 'login',
		component: LoginComponent,
		canActivate: [AuthRedirect],
		data: { title: 'Login' }
	},
	{
		path: 'signup',
		component: SignupComponent,
		canActivate: [AuthRedirect],
		data: { title: 'Sign Up' }
	},
	{
		path: '',
		redirectTo: '/login',
		pathMatch: 'full'
	}
];

const accessTokenName = 'accessToken';

@NgModule({
	declarations: [
		AppComponent,
		BookComponent,
		LoginComponent,
		SignupComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		RouterModule.forRoot(
			appRoutes,
			{ enableTracing: true } // <-- debugging purposes only
		),

		JwtModule.forRoot({
			config: {
				// https://github.com/auth0/angular2-jwt
				tokenGetter: jwtTokenGetter,
				// whitelistedDomains: [],
				// blacklistedRoutes: [/api\/v1\/auth.*/] ---> regex는 --prod에서 오류 발생.
				blacklistedRoutes: [
					'/api/signin',
					'/api/signup',
					'/api/refresh',
				]
			}
		}),
	],

	providers: [
		AuthGuard, 
		AuthRedirect,
		JwtInterceptor, // Providing JwtInterceptor allow to inject JwtInterceptor manually into RefreshTokenInterceptor
		// kje: 순서의 영향도 있는듯! 일반적으로 순서대로 interceptor가 실행되는듯...?
		{ provide: HTTP_INTERCEPTORS, useExisting: JwtInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true }],
	bootstrap: [AppComponent]
})
export class AppModule { }




/*-------------------------------------------------
	Token 관련 : ng build --prod의 경우를 위해 필요
	https://github.com/auth0/angular2-jwt/issues/401
	https://github.com/auth0/angular2-jwt/issues/602
--------------------------------------------------*/
export function jwtTokenGetter() {
	return localStorage.getItem(accessTokenName);
}
