import { Component, Input, OnInit, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-ng-on-change',
  templateUrl: './ng-on-change.component.html',
  styleUrls: ['./ng-on-change.component.css']
})
export class NgOnChangeComponent implements OnInit {
  
  @Input() student: any;

  name:any;
  score:any;
  grades:any;

  constructor() { }

  ngOnChanges(changeData: SimpleChanges) {
    
    console.log(changeData.student.currentValue);
    this.name = changeData.student.currentValue.name;
    this.score = changeData.student.currentValue.score;
    // this.doSomething(this.student);

    switch (true) {
      case this.score >=90:
        this.grades = '완벽해요.';
        break;
      case this.score >=80 && this.score< 90:
        this.grades = '잘했어요';
        break;
      case this.score >=70 && this.score< 80:
        this.grades = '좋아용';
        break;
      case this.score >=60 && this.score< 70:
        this.grades = '아쉬워요';
        break;
      case this.score >=50 && this.score< 60:
        this.grades = '노력이 더 필요해요';
        break;
      case this.score >=40 && this.score< 50:
        this.grades = '탈락';
        break;
    }
  }


  ngOnInit(): void {
  }

  private doSomething(input: string) {
    console.log(input);
  }
  
}
