import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { DataService } from './data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'front';
  hello: any;
  //ngOnInit 때 쓰는 sdudents
  students: any;
  //output1() 때(set 방식) 쓰는 students
  _students1: any;
  //output3() 때(rxjs 방식) 쓰는 students
  _students2: any;

  constructor(private http: HttpClient, public dataService: DataService) { }

  ngOnInit(): void {
    // hello world 불러오기
    this.http.get('/api').subscribe((res: any) => {
      console.log(res.msg)
      this.hello = res.msg
      //(res) => console.log(res)
      
    });

    // data store에 넣을 학생 정보 불러오기
    this.http.get('/api/rxjs').subscribe((res: any) => {
      this.students = res
      // Data Store의 함수 불러오기
      // 서비스에 함수가 정의 되어있다.
      this.dataService.updateData(this.students);
    });
   
    
    
  }

  // set 방식
  output1(){
    this.http.get('/api/set1')
      .subscribe((res:any) => {
      this._students1 = res
      console.log(this._students1)
    });
  }

  output2(){
    this.http.get('/api/set2')
    .subscribe((res:any) => {
      this._students1 = res
      console.log(this._students1)
    });
  }

  output3(){
    this.dataService.students$.subscribe(students => this._students2 = students)
  }

  outputName(state:any){
    console.log("state"+state);
    this.hello = state;
  }
}
