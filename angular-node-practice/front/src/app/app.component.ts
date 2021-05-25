import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'front';
  hello: any;


  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('/api').subscribe( 
        (res: any) => this.hello = res.msg
        //(res) => console.log(res)
      );
  }
}
