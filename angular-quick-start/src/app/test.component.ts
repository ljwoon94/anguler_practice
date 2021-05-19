import { Component } from "@angular/core";

// 클래스위에 데코레이터 추가
@Component({
    // selector : 이름    태그생성
    selector : 'app-test',
    // template : 태그안에 들어갈 내용
    template:`
    <p>오늘은 첫 세미나 날입니다.</p>
    `,
    styles:[`
    p{
        color:red;
    }
    `]
})
export class TestComponent {

}