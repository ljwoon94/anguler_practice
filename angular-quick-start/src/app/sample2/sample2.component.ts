import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sample2',
  templateUrl: './sample2.component.html',
  styleUrls: ['./sample2.component.css']
})
export class Sample2Component implements OnInit {
  //맴버 변수로 등록
  name = 'JeongWoon';

  constructor() { }

  ngOnInit(): void {
    setTimeout(()=>{
      this.name = 'hoho';
    },(2000));
  }

  click(e){
    console.log(e);
    this.name = '하하하하';
  }
}
