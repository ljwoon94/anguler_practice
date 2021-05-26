import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.css']
})
export class SetComponent implements OnInit {
  _student: any;
  
  @Input() set student(value:any){
    this._student= value;
  }
  constructor() { }

  ngOnInit(): void {
    console.log(this._student);
  }

}
