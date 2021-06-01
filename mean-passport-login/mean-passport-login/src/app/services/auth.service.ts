import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

import { tap, shareReplay } from 'rxjs/operators';
import { map } from 'rxjs/operators';

/**
 * token response interface
 */
interface Login {
	accessToken: string;
	refreshToken: string;
	profile: any;
}


/**
 * Auth 관련 service
 * - Auth와 관련된 부분의 Storage는 localStorage 사용.
 * - 지금 임시로 service 가져다 쓴 내용이며
 *   본 프로젝트에서 실제로 모든 명령이 사용되는 것은 아님
 */
@Injectable({
	providedIn: 'root'
})
export class AuthService {

	apiAddr = '/api';
	// 토큰 이름 정의
	refreshTokenName = 'refreshToken';
	accessTokenName = 'accessToken';

	// Login status observable...
	loginState$: Observable<boolean>;
	private _loginState$: BehaviorSubject<boolean>;

	constructor(
		private http: HttpClient,
		private jwtHelper: JwtHelperService,
		private router: Router,
	) {
		this._loginState$ = new BehaviorSubject(false);
		this.loginState$ = this._loginState$.asObservable();
	}


	/**
	 * Login Status 처리
	 * @param nextState login or not.
	 */
	setLoginState(nextState: boolean): void {
		this._loginState$.next(nextState);
	}


	// 현재는 그냥 component에서 진행.
	signup(user) {
		console.log('[signup] user: ', user);
		return this.http.post(this.apiAddr + '/signup', user);
	}

	login(user): Observable<Login> {
		return this.http.post<Login>(this.apiAddr + '/signin', user)
			.pipe(
				// do -> tap
				tap(res => {
					// 실제 구현시에는 access token, refresh token이 모두 있는지 check 할것.
					console.log(res);
					this.setAccessToken(res.accessToken); // token 저장
					this.setRefreshToken(res.refreshToken); // token 저장
					this.setLoginState(true); // login status: true 설정

				}),
				shareReplay()
			);
	}

	// kje token refresh test!
	// https://versluis.ca/2019/02/02/adding-jwt.html
	// https://gist.github.com/Toilal/8849bd63d53bd2df2dd4df92d3b12f26
	refresh(): Observable<{ accessToken: string }> {
		const accessToken = localStorage.getItem(this.accessTokenName);
		const refreshToken = localStorage.getItem(this.refreshTokenName); // refresh token

		// https://angular.io/guide/http
		return this.http.post<{ accessToken: string }>(this.apiAddr + `/refresh`, { accessToken, refreshToken })
			.pipe( // kje
				tap(res => {
						if (res && res.accessToken) {
							this.setAccessToken(res.accessToken);
						}
					},
					err => { // refresh fail
						alert('Refresh token may be expired... (auth.service.ts)');
						// this.logout();
					}
				)
			);
		// .pipe(map((result: { accessToken: string; }) => {
		// 	if (result && result.accessToken) {
		// 		this.setAccessToken(result.accessToken);
		// 	}
		// 	else {
		// 		this.logout();
		// 	}
		// 	return result;
		// }));
	}

	// 로그아웃 시 token 제거
	logout(): void {
		this.removeToken();
		this.setLoginState(false);

		this.router.navigate(['login']);
	}

	isAuthenticated(): boolean {
		const token = this.getToken();
		if (token && !this.isTokenExpired()) {
			this.setLoginState(true);
			return true;
		} else {
			this.setLoginState(false);
			return false;
		}
	}


	// access token
	getToken(): string {
		return localStorage.getItem(this.accessTokenName);
	}

	setAccessToken(token: string): void {
		localStorage.setItem(this.accessTokenName, token);
	}


	// refresh token
	getRefreshToken() {
		return localStorage.getItem(this.refreshTokenName);
	}

	setRefreshToken(token: string): void {
		localStorage.setItem(this.refreshTokenName, token);
	}

	removeToken(): void {
		localStorage.removeItem(this.refreshTokenName);
		localStorage.removeItem(this.accessTokenName);
	}

	/*
		token 유효 기간 체크
		The JwtHelper class has several useful methods that can be utilized in your components:

		decodeToken
		getTokenExpirationDate
		isTokenExpired

		npm install @auth0/angular-jwt
		https://github.com/auth0/angular2-jwt
	*/
	isTokenExpired() {
		return this.jwtHelper.isTokenExpired(this.getToken());
	}

	getExpirationDate() {
		return this.jwtHelper.getTokenExpirationDate(this.getToken());
	}


	/**
	 *
	 * token 내용 받아오기
	 *
	 */
	getTokenInfo() {
		return this.jwtHelper.decodeToken(this.getToken());
	}

	/**
	 * 사용자의 document_id return;
	 */
	getUser_id(): string {
		return this.jwtHelper.decodeToken(this.getToken())._id;
	}

	/**
	 * 
	 * token 내용 받아오기
	 * 
	 */
	getPayload() {
		const token = this.getToken();
		if (token && token.split('.').length === 3) {
			try {
				const base64Url = token.split('.')[1];
				const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
				return JSON.parse(decodeURIComponent(encodeURIComponent(window.atob(base64))));
			} catch (e) {
				return undefined;
			}
		}
		else {
			return undefined;
		}
	}

	// https://github.com/auth0/angular2-jwt library에서 지원하므로 삭제 예정...  (참고용도로 남겨둠)
	// app.module.ts 참조.
	// setHeader() {
	// 	// create authorization header with jwt token
	// 	const user_token = localStorage.getItem(this.tokenName);
	// 	if (user_token) {
	// 		// https://angular.io/guide/http#headers
	// 		const headers = new HttpHeaders({ 'Authorization': user_token });
	// 		return { headers: headers };
	// 	}
	// }

	/**
	 * 사용자의 document_id return;
	 */
	getUserDocId() {
		return this.getPayload()._id;
	}

}
