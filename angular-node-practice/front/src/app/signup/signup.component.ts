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
  _userForm:any;
  _userList:any;

  constructor(
    private http: HttpClient,
    private router: Router, 
  ) { }

  ngOnInit(): void {
    this.http.get('/api/get/list').subscribe((res: any) => {
      //console.log(res);
      this._userList = res;
    });
  }
  
  onNgSubmit(userForm: NgForm) {
    //console.log(userForm.value);
    this.http.post('/api/post/signup', userForm.value ).subscribe((res: any) => {
      if(res.result == 'done'){
        this.router.navigate(['/signup'])
          .then(() => {
            window.location.reload();
          });
      }
    },
    err => {
      console.log(err);
      alert('에러');
    });
  }

}
