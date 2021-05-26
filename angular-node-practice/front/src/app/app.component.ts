import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'front';
  hello: any;
  students: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('/api').subscribe((res: any) => {
      console.log(res.msg)
      this.hello = res.msg
        //(res) => console.log(res)
      });
  }

  output1(){
    this.http.get('/api/set1')
      .subscribe((res:any) => {
      this.students = res
      console.log(this.students)
    });
  }

  output2(){
    this.http.get('/api/set2')
    .subscribe((res:any) => {
      this.students = res
      console.log(this.students)
    });
  }
}
