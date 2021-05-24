import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css']
})
export class RxjsComponent implements OnInit {

  students:any;

  constructor(public dataService: DataService) { }

  ngOnInit(): void {

  }

  output3(){
    // dataStream 값을 가져오기 위해 streamData에 넣어두기
    // this.dataService.students$.subscribe(streamData => this.students = streamData)
    // this.dataService.students$ 데이터 스토어에 저장된 현재값을 subscribe를 통해 불러온다.
    this.dataService.students$.subscribe(studentsInfo => this.students = studentsInfo)
    console.log(this.students);
  }

}
