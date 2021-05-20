import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '앵귤러 연습 시작!';
  names = [
    '사과','딸기','수박'
  ];

  custom(){
    console.log('custom');
  }
}
