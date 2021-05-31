import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(
    private http: HttpClient, 
    private router: Router,
    private loginService: LoginService,
  ) { }

  ngOnInit(): void {
  
  }

  onLogIn(loginForm:NgForm){
    // this.http.post('/api/post/signin', loginForm.value )
    //   .subscribe((res: any) => {})
    this.loginService.login(loginForm.value).subscribe((data:any) => {
			console.log('login Component => ', data);
			this.router.navigate(['board']);
		}, (err: any) => {
			console.log('login Component Error => ', err);
		});
  }
}
