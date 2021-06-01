import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

	constructor(
		private loginService: LoginService,
		private router: Router
	) { }

	canActivate(): boolean {
		if (!this.loginService.isAuthenticated()) {
			this.router.navigate(['']);
			return false;
		}
		return true;
	}
}

@Injectable()
export class AuthRedirect implements CanActivate {

	private accessTokenName = 'accessToken';

	constructor(
		private router: Router,
		private loginService: LoginService
	) { }

	canActivate(): boolean {

		// 실제로는 아래와 같이 auth 처리. 임시로 일단 존재여부만 확인.
		// if (!this.auth.isAuthenticated()) {
		if (this.loginService.isAuthenticated()) {
			alert('이미 로그인된 상태! books로 이동...');
			this.router.navigate(['/main']);
			return false;
		} else {
			return true;
		}
	}
}