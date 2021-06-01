import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login.service';

// 토큰 없이 들어온 경우
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

	private TOKEN_NAME = 'jwt_token';

	constructor(
		private loginService: LoginService,
		private router: Router
	) { }

	
	// https://stackoverflow.com/questions/42719445/pass-parameter-into-route-guard
	canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot) {
		console.log('[activate check]');
		// 토큰 유효 기간 확인
		// 토큰 만료 혹은 종료 시 login page로 돌아감.
		// 실제로는 아래와 같이 auth 처리. 임시로 존재여부만 확인.
		// if (!localStorage.getItem(this.TOKEN_NAME)) {
		if (!this.loginService.isAuthenticated()) {
			console.log('invalid token!');
			// 로그인 먼저 하라는 modal/alert창 띄우기
			alert('먼저 로그인을 해주세요.');

			this.router.navigate(['signin']);

			return false;
		}
		return true;
	}
}

// 토큰이 접속되어 있는 경우
@Injectable()
export class AuthRedirect implements CanActivate {

	private TOKEN_NAME = 'jwt_token';

	constructor(
		private router: Router,
		private loginService: LoginService
	) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

		// 실제로는 아래와 같이 auth 처리. 임시로 일단 존재여부만 확인.
		//if (localStorage.getItem(this.TOKEN_NAME)) {
		if (this.loginService.isAuthenticated()) {
			alert('이미 로그인된 상태! books로 이동...');
			this.router.navigate(['board']);
			return false;
		} else {
			return true;
		}
	}
}