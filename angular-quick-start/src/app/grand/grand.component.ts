import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grand',
  templateUrl: './grand.component.html',
  styleUrls: ['./grand.component.css']
})
export class GrandComponent implements OnInit {
  age = 35;
  constructor() { }

  ngOnInit(): void {
  }
  up(){
    this.age = this.age + 1;
  }

}
