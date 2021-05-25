import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-getset',
  templateUrl: './getset.component.html',
  styleUrls: ['./getset.component.css']
})
export class GetsetComponent implements OnInit {
  
  _student: any;
  grades:any;
  
  @Input() set student(value: any){
    this._student= value;

    switch (true) {
      case this._student.score >=90:
        console.log(this._student.score)
        this.grades = '완벽해요.';
        break;
      case this._student.score >=80 && this._student.score< 90:
        console.log(this._student.score)
        this.grades = '잘했어요';
        break;
      case this._student.score >=70 && this._student.score< 80:
        this.grades = '좋아용';
        break;
      case this._student.score >=60 && this._student.score< 70:
        this.grades = '아쉬워요';
        break;
      case this._student.score >=50 && this._student.score< 60:
        this.grades = '노력이 더 필요해요';
        break;
      case this._student.score >=40 && this._student.score< 50:
        this.grades = '탈락';
        break;
    } 
  }
  constructor() { }

  ngOnInit(): void {
  }

}
