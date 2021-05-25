import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rxjs2',
  templateUrl: './rxjs2.component.html',
  styleUrls: ['./rxjs2.component.css']
})
export class Rxjs2Component implements OnInit {
  @Input() student:any;
  grades:any;
  constructor() { }

  ngOnInit(): void {
    if(this.student.score >= 90) {
      this.grades ='완벽해요'
    } else if (this.student.score >= 80 && this.student.score < 90){
      this.grades ="잘했어요"
    } else if (this.student.score >= 70 && this.student.score < 80){
      this.grades ="좋아용"
    } else if (this.student.score >= 60 && this.student.score < 70){
      this.grades ="아쉬워요"
    } else if (this.student.score >= 50 && this.student.score < 60){
      this.grades ="노력이 더 필요해요"
    } else if (this.student.score < 50) {
      this.grades ="탈락"
    }
  }

}
