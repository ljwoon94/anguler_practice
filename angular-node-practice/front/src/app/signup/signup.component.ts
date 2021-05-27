import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  _userForm:any;


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }
  
  onNgSubmit(userForm: NgForm) {
    //console.log(userForm.value);
    this.http.post('/api/post/signup', userForm.value ).subscribe((res: any) => {
      console.log("회원가입",res);
    });
  }

}
