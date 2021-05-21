import { Component } from '@angular/core';
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
  
  // output(){
  //   if(this.studentsInfo == studentsInfo){
  //     this.studentsInfo = studentsInfo2;
  //   }else{
  //     this.studentsInfo = studentsInfo;
  //   }
  // }
  output(){
    this.students = studentsInfo;
    console.log(this.students)
   }
   output2() {
     this.students = studentsInfo2;
     console.log(this.students)
   }
  
}
