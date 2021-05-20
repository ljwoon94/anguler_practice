import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// 양방향 테이터 바인딩 사용에 필요  [(ngModel)]
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TestComponent } from './test.component';
import { Sample1Component } from './sample1/sample1.component';
import { Sample2Component } from './sample2/sample2.component';
import { Sample3Component } from './sample3/sample3.component';
import { GrandComponent } from './grand/grand.component';
import { ParentComponent } from './parent/parent.component';
import { ChildComponent } from './child/child.component';

@NgModule({
  declarations: [
    AppComponent,
    // TestComponent 등록
    TestComponent,
    Sample1Component,
    Sample2Component,
    Sample3Component,
    GrandComponent,
    ParentComponent,
    ChildComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // 양방향 데이터 바인딩시 필요
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
