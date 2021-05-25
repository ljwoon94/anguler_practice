import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HelloworldComponent } from './helloworld/helloworld.component';
import { GetsetComponent } from './getset/getset.component';
import { NgOnChangeComponent } from './ng-on-change/ng-on-change.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { Rxjs2Component } from './rxjs2/rxjs2.component';



@NgModule({
  declarations: [
    AppComponent,
    HelloworldComponent,
    GetsetComponent,
    NgOnChangeComponent,
    RxjsComponent,
    Rxjs2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
