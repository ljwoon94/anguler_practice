import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { AuthGuardService, AuthRedirect } from './services/auth-guard.service';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'signin', 
    pathMatch: 'full' 
  },
  { path: 'signin', 
    component: SigninComponent, 
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
