import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataService } from '../data.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs2',
  templateUrl: './rxjs2.component.html',
  styleUrls: ['./rxjs2.component.css']
})
export class Rxjs2Component implements OnInit {
  
  @Output() output = new EventEmitter<any>();
  
  students:any;

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    
  }

  output4(){
    // dataStream 값을 가져오기 위해 streamData에 넣어두기
    // this.dataService.students$.subscribe(streamData => this.students = streamData)
    // this.dataService.students$ 데이터 스토어에 저장된 현재값을 subscribe를 통해 불러온다.
    
    // pipe는 비동기 작업을 구성하기 위해 사용
    // 인자를 함수로 받고 함수들을 순차적으로 연산한다.
    // 각 연산자를 거치며 새로운 옵저버블 인스턴스 리턴함.
    // map 순차적으로 주어진 함수를 실행한 반환 값을 모아 새로운 배열을 반환
    // subscribe() 으로 호출
    // filter 요소마다 조건 확인 후 조건을 만족하는 원소들로 구성된 새로운 배열 리턴
    this.dataService.students$.pipe(
      map(v => v.filter((x:any) => x.score > 90 ))
    ).subscribe(v => this.students = v)
   
  }
  outputName(student:any){
    this.output.emit(student.name);
    console.log(student.score);
  }
  outputScore(student:any){
    this.output.emit(student.score);
    console.log(student.score);
  }
}
