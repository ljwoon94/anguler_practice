import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-getset',
  templateUrl: './getset.component.html',
  styleUrls: ['./getset.component.css']
})
export class GetsetComponent implements OnInit {
  
  _student: any;

  @Input() set student(value: any){
    this._student= value;
  }
  constructor() { }

  ngOnInit(): void {
  }

}
