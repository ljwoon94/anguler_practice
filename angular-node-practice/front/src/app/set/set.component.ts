import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.css']
})
export class SetComponent implements OnInit {
  _student: any;
  
  @Input() 
  set student(v : any) {
    this._student = v;
  }
  @Output() output = new EventEmitter();
  get student() : any {
    return this._student
  }
  
  constructor() { }
  outputName(_student:any){
    this.output.emit(_student.name);
    console.log("outputName",_student.name)
  }
  ngOnInit(): void {
    console.log(this._student);
  }

}
