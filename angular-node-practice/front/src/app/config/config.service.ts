import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { HelloWorld } from '../helloworld'

@Injectable({
  providedIn: 'root'
})

export class ConfigService {
  
  endPoint = 'http://localhost:3000';

  constructor(public httpClient: HttpClient) { }

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  getHello(): Observable<HelloWorld>{
    return this.httpClient.get<HelloWorld>(this.endPoint)
    .pipe(
      retry(1),
      catchError(this.httpError)
    )
  }

  httpError(error:any) {
    let msg = '';
    if(error.error instanceof ErrorEvent) {
      // client side error
      msg = error.error.message;
    } else {
      // server side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(msg);
    return throwError(msg);
  }
 
}
