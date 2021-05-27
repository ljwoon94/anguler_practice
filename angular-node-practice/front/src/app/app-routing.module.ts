import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'
import { SignupComponent } from './signup/signup.component'
import { AppComponent } from './app.component';
import { ArouterComponent } from './arouter/arouter.component';

//// 라우트 구성
const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  { path: 'arouter', component: ArouterComponent },
  { path: '', component: AppComponent },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
