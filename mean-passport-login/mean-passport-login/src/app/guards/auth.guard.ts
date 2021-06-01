import { Injectable, OnInit } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';



@Injectable()
export class AuthGuard implements CanActivate, OnInit {

	private accessTokenName = 'accessToken';

	constructor(
		private router: Router) { }

	ngOnInit() {
		console.log('auth guard oninit');
	}


	// https://stackoverflow.com/questions/42719445/pass-parameter-into-route-guard
	canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot) {
		console.log('[activate check]');
		// 토큰 유효 기간 확인
		// 토큰 만료 혹은 종료 시 login page로 돌아감.
		// 실제로는 아래와 같이 auth 처리. 임시로 존재여부만 확인.
		// if (!this.auth.isAuthenticated()) {
		if (!localStorage.getItem(this.accessTokenName)) {
			console.log('invalid token!');
			// 로그인 먼저 하라는 modal/alert창 띄우기
			alert('먼저 로그인을 해주세요.');

			this.router.navigate(['login']);

			return false;
		}
		return true;
	}
}




@Injectable()
export class AuthRedirect implements CanActivate, OnInit {

	private accessTokenName = 'accessToken';

	constructor(private router: Router) { }

	ngOnInit() {
		console.log('auth redirect oninit');
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

		// 실제로는 아래와 같이 auth 처리. 임시로 일단 존재여부만 확인.
		// if (!this.auth.isAuthenticated()) {
		if (localStorage.getItem(this.accessTokenName)) {
			alert('이미 로그인된 상태! books로 이동...')
			this.router.navigate(['/books']);
			return false;
		} else {			
			return true;
		}
	}
}
