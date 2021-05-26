import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
    // BehaviorSubject는 구독 시 항상 현재값을 반환한다.
    // 배열이면 <any>([])을 넣고 초기화 실시
    private studentsInfoSource = new BehaviorSubject<any>([]);
    // asObservable은 studentsInfoSource 항시 관측한다.
    // students$ 에 현재값을 저장한다.
    students$ = this.studentsInfoSource.asObservable();

    constructor() { }

    // 파라미터 값을 studentsInfoSource에 dataStream으로 저장
    updateData(students: any) {
      console.log('dataStroage',students);
      this.studentsInfoSource.next(students);
   }
}
