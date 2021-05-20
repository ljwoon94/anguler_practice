import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  @Input() name;
  @Input() age;


  @Output() next = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    setInterval(()=>{
      this.next.emit();
    },3000)
  }
  // click(e: HTMLInputElement){
  //   console.log(e);
  // }
  click(text, event){
    console.log(text);
    console.log(event);
  }
}
