import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SetComponent } from './set/set.component';
import { NgOnChangeComponent } from './ng-on-change/ng-on-change.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { Rxjs2Component } from './rxjs2/rxjs2.component';

@NgModule({
  declarations: [
    AppComponent,
    SetComponent,
    NgOnChangeComponent,
    RxjsComponent,
    Rxjs2Component
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
