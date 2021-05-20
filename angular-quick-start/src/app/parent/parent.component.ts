import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {
  @Input() age;
  @Output() up = new EventEmitter
  
  constructor() { }

  ngOnInit(): void {
  }

  next(){
    this.up.emit();
  }

}
