import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-ng-on-change',
  templateUrl: './ng-on-change.component.html',
  styleUrls: ['./ng-on-change.component.css']
})
export class NgOnChangeComponent implements OnInit {
  @Input() student: any;
  name:any;
  score:any;

  @Output() output = new EventEmitter();
  constructor() { }



  ngOnInit(): void {
  }

  ngOnChanges(changeData: SimpleChanges) {
    
    console.log(changeData.student.currentValue);
    this.name = changeData.student.currentValue.name;
    this.score = changeData.student.currentValue.score;
  }
  outputName(name:any){
    this.output.emit(name);
    console.log("outputName",name)
  }
  outputScore(score:any){
    this.output.emit(score);
    console.log("outputScore",score)
  }
}
