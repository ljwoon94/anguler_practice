import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { JwtInterceptor } from '@auth0/angular-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
	constructor(
		private auth: AuthService,
		private jwtInterceptor: JwtInterceptor) {
	}

	// https://github.com/auth0/angular2-jwt/issues/517
	// https://gist.github.com/Toilal/8849bd63d53bd2df2dd4df92d3b12f26
	// https://versluis.ca/2019/02/02/adding-jwt.html
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (this.jwtInterceptor.isWhitelistedDomain(req) && !this.jwtInterceptor.isBlacklistedRoute(req)) {
			return next.handle(req).pipe(
				catchError(err => {
					console.log(err);
					console.log('err status ---> ', err.status);
					// const errorResponse = err as HttpErrorResponse;
					// const expiredHeader = errorResponse.headers.get('AccessToken-Expired') === 'true';

					// if (errorResponse.status === 401 && expiredHeader) {

					if (err.status === 401) {
						alert('1. HTTP Interceptor 401 : may be Access Token Expired... --> Access Token 요청 ');

						// return this.auth.refresh().pipe(mergeMap(() => {
						// 	// 정상적인 경우에만 들어오고 error 발생은 auth.refresh 내부에서 catch.. -> 여기서 할수 있는지 check.
						// 	alert('2. Access Token 수신 --> Book API 다시 실행 ');
						// 	return this.jwtInterceptor.intercept(req, next); 

						// 	// kje: 2번째 observable을 구독하면 처음 auth refresh도 실행되는 형식?
						// 	// https://han41858.tistory.com/39 참고 (단 switchmap)
						// }));

						return this.auth.refresh().pipe(
							// 여기서는 이런 식으로 error catch가 가능한 듯.
							// https://stackoverflow.com/questions/48715591/angular-catching-errors-in-rxjs-pipe-mergemap-sequence
							catchError((e: any) => {
								alert('Refresh Error!!! : (refresh-token-interceptor.ts)');
								return throwError(e);
							}),
							mergeMap(() => {
								// switchMap(() => { // switchMap이 더 나으려나? 딱히 상관은 없어 보이는데...
								alert('2. Access Token 수신 --> Book API 다시 실행 ');
								return this.jwtInterceptor.intercept(req, next);

								// kje --> next로 하려면 app.module에서 Refresh Token이 JWT앞으로 와야하는듯... (순서영향!)
								// 순서 상관 없이 하려면 위와같이 jwtInterceptor를 직접 호출!
								// return next.handle(req);

								// kje: 2번째 observable을 구독하면 처음 auth refresh도 실행?
								// https://han41858.tistory.com/39 참고 (switchmap)
							})
						);

						// return this.auth.refresh().pipe(mergeMap( (r: any) => {
						// 	console.log(r);
						// 	// Refresh token도 expired 된 경우는 여기로 들어와야 할 듯. 
						// 	if (!r.accessToken) {
						// 		alert('2. Access Token 미수신 --> may be refresh token expired... Logout! ');
						// 		this.auth.logout();

						// 	} else {
						// 		// 원래 명령 다시 실행하는 루틴일듯...
						// 		alert('2. Access Token 수신 --> Book API 다시 실행 ');
						// 		return this.jwtInterceptor.intercept(req, next);
						// 	}
						// }));
					}

					return throwError(err);
				})
			);
		} else {
			// Refresh API의 경우 여기를 통과하게됨?
			return next.handle(req);
		}
	}
}