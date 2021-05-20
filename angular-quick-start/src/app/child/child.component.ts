import { Component, Input, OnChanges, OnInit, Output, EventEmitter, AfterViewInit, AfterContentChecked, AfterViewChecked, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit, OnChanges, AfterContentInit, AfterViewInit, AfterContentChecked, AfterViewChecked {

  @Input() name;
  @Input() age;


  @Output() next = new EventEmitter();

  // 컴포넌트 라이프 사이클
  // 컨스트럭터 누가 뭐래도 먼저나옴.
  constructor() {
    console.log('constructor');
  }

  // 주로 많이 씀.
  // 최초 초기화때 / Inpuy 프로퍼티가 변경될때
  // Input 이 없으면 실행되지 안흔다.
  ngOnChanges(){
    console.log('ngOnChanges');
  }
  
  // 프로퍼티 초기화된 직후
  ngOnInit(): void {
    console.log('ngOnInit');
    setInterval(()=>{
      this.next.emit();
    },3000)
  }

  // ngContent 사용 시 자식이 초기화 된 직후
  ngAfterContentInit(){
    console.log('AfterContentInit');
  }

  // ngContent를 통해 HTML 을 받을때
  ngAfterViewInit(){
    console.log('AfterViewInit');
  }

  //템플릿이 모두 초기화 되었을때
  ngAfterContentChecked(){
    console.log('AfterContentChecked');
  }

  // 템플릿에 바인딩된 값이 변경되었을때
  ngAfterViewChecked(){
    console.log('AfterViewChecked');
  }

  
  // click(e: HTMLInputElement){
  //   console.log(e);
  // }
  click(text, event){
    console.log(text);
    console.log(event);
  }
}
