import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-book',
	templateUrl: './book.component.html',
	styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

	books: any;
	tokenInfo: any;
	isExpired: boolean;
	expTime: any;
	current: any;
	timeLeft: any;

	refreshToken: string;

	constructor(
		private http: HttpClient,
		private router: Router,
		private auth: AuthService, ) { }

	ngOnInit() {
		this.testAPI();
	}

	logout() {
		// localStorage.removeItem('jwtToken');
		// this.router.navigate(['login']);
		this.auth.logout();
	}

	// kje: book api로 그냥 token 이거저거 test...
	testAPI() {
		this.getTokenInfo();

		// Header에 token은 자동으로 들어감. (@auth0/)
		// const httpOptions = {
		// 	headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('jwtToken') })
		// };
		// this.http.get('/api/book', httpOptions).subscribe(data => {
		this.http.get('/api/book').subscribe(data => {
			this.books = data;
			console.log(this.books);

			// Get Token Info ///////////////////////////////////
			this.getTokenInfo();

		}, err => {
			this.books = err;
			console.log('un Auth...')
			// if (err.status === 401) {
			// 	this.router.navigate(['login']);
			// }
		});

	}

	// kje: exp가 없는 경우에 false여야 하는데 code 상에서 true로 return함...
	// source를 변경하던지 하나 더 처리를 해주어야 할듯?
	// --> 최신 버전에서는 정상적으로 변경된듯.. (V3.0.0) : 이 소스는 반영되지 않은 소스임
	getTokenInfo() {
		this.tokenInfo = this.auth.getTokenInfo();
		this.isExpired = this.auth.isTokenExpired();
		this.current = new Date();
		this.expTime = this.auth.getExpirationDate();
		this.timeLeft = (this.expTime - this.current) / 1000;

		this.refreshToken = this.auth.getRefreshToken();
	}

}
