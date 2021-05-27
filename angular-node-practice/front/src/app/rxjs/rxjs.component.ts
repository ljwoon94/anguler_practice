import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit {


  
  @Input() student:any;
  @Output() output = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  outputName(student:any){
    this.output.emit(student.name);
    console.log(student.name);
  }

  outputScore(student:any){
    this.output.emit(student.score);
    console.log(student.score);
  }
}
