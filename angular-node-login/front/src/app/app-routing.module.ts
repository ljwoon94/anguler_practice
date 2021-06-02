import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { AuthGuardService, AuthRedirect } from './services/auth-guard.service';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

// Guard 는 라우팅 접근 제어다.
// guard-service 정의에 따라 route에 접근을 허가/불허가 하게 한다.
// ex) 로그인 유무에 따라 접근 가능한 라우트가 달라진다.

const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'signin', 
    pathMatch: 'full' 
  },
  { path: 'signin', 
    component: SigninComponent,
    // CanActivate는 라우터의 접근 권한 검사.
    // [AuthRedirect] auth-guard.servie에 정의되어있다.
    canActivate: [AuthRedirect],
  },
  { 
    path: 'signup', 
    component: SignupComponent,
    canActivate: [AuthRedirect], 
  },
  { path: 'board', 
    component: BoardComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
