import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-ng-on-change',
  templateUrl: './ng-on-change.component.html',
  styleUrls: ['./ng-on-change.component.css']
})
export class NgOnChangeComponent implements OnInit {
  @Input() student: any;
  name:any;
  score:any;


  constructor() { }



  ngOnInit(): void {
  }

  ngOnChanges(changeData: SimpleChanges) {
    
    console.log(changeData.student.currentValue);
    this.name = changeData.student.currentValue.name;
    this.score = changeData.student.currentValue.score;
  }
}
