import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rxjs2',
  templateUrl: './rxjs2.component.html',
  styleUrls: ['./rxjs2.component.css']
})
export class Rxjs2Component implements OnInit {
  @Input() student:any;
  constructor() { }

  ngOnInit(): void {
    
  }

}
