import { Component, OnInit } from '@angular/core';
import { of, pipe } from 'rxjs';
import { DataService } from '../data.service';
import { filter, map } from 'rxjs/operators';

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
    
    
    const students90 = this.dataService.students$.pipe(
      filter((v:any)=> v.score >= 90),
      map((v:any) => v +"학생")
    );
    students90.subscribe(v =>this.students = v);
    //this.dataService.students$.subscribe(studentsInfo => this.students = studentsInfo)
    // console.log(this.students);

  }

}
