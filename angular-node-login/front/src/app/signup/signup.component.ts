import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private http: HttpClient,
      private router: Router,
    ) { }

  ngOnInit(): void {
  }
  onSignUp(signupForm:NgForm){
    console.log(signupForm.value);
    this.http.post('/api/post/signup', signupForm.value ).subscribe((res: any) => {
      if(res.result=='done'){
        this.router.navigate(['/'])
      }
    },
    err => {
      console.log(err);
      alert('에러');
    });
  }
}
