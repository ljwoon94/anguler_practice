import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { LoginService } from '../services/login.service';

interface Header {
	title: string;
	subtitle: string;
}


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  header: Header;
	userId: string;
	signInId: string;
	users: User[];
  signInUser: User;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
		private loginService: LoginService,
    private http: HttpClient,
    
  ) { }

  ngOnInit(): void {
    this.header = this.route.snapshot.data as Header;
		// get userid from token
		this.userId = this.loginService.getUserid();
		this.signInId = this.loginService.getSigninId();

    let id : any = this.userId;
    
    this.http.get('/api/get/userInfo').subscribe((res: any) => {
      this.users = res
    });

    this.http.get(`/api/get/userInfo/${this.userId}`).subscribe((res: any) => {
      console.log('오홓홍',res);
      this.signInUser = res;
    });
  }

  logout() {
		this.loginService.logout();
		this.router.navigate(['']);
	}

}
