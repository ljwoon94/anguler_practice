import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	accessTokenName = 'accessToken';
	loginData = { username: 'test@naver.com', password: '1234' };
	message = '';
	data: any;

	constructor(
		private http: HttpClient,
		private router: Router,
		private auth: AuthService) { }

	ngOnInit() {
	}

	login() {
		this.auth.login(this.loginData).subscribe(resp => {
			this.data = resp;
			this.router.navigate(['books']);
		}, err => {
			console.log(err);
			this.message = err.message;
		});
	}

	private handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			console.error(error); // log to console instead
			console.log(`${operation} failed: ${error.message}`);
			return of(result as T);
		};
	}

}
