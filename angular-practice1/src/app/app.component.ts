import { Component } from '@angular/core';
import { DataService } from './data.service';
import { studentsInfo } from './studentsInfo';
import { studentsInfo2 } from './studentsInfo2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'angular-practice1';
  students:any;
  
  output(){
    this.students = studentsInfo;
    console.log(this.students)
  }
  output2() {
    this.students = studentsInfo2;
    console.log(this.students)
  }
  
  // Data Store 불러오기
  constructor(public dataService: DataService){ }
  
  ngOnInit(){
    // Data Store의 함수 불러오기
    // 서비스에 함수가 정의 되어있다.
    this.dataService.updateData(studentsInfo);
    
  }


}
