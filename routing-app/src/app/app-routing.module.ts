import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import { ChildAComponent } from './child-a/child-a.component';
import { ChildBComponent } from './child-b/child-b.component';

const routes: Routes = [
  { path: 'first-component', component: FirstComponent ,
    children: [
      {
        path: 'child-a', // 자식 라우팅 규칙과 연결되는 주소
        component: ChildAComponent, // 라우터가 렌더링하는 자식 컴포넌트
      },
      {
        path: 'child-b',
        component: ChildBComponent, // 또다른 자식 컴포넌트
      },
  ],
  },
  { path: 'second-component', component: SecondComponent },
  { path: '',   redirectTo: '/first-component', pathMatch: 'full' },
  // `first-component` 주소로 리다이렉트 합니다. ''은 기본 url
  //{ path: '**', component: PageNotFoundComponent },  
  // 404 에러 화면을 표시하는 와일드카드 라우팅 규칙
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})



export class AppRoutingModule { }
