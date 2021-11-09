import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MyHttpInterceptorInterceptor implements HttpInterceptor {

  bearerAuth:string='eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTYzNjQ1MjQwOSwiZXhwIjoxNjM3MzE2NDA5fQ._CXCKm8M9r4iXLkTwAk_9D2B71bEDKDB1PvMMLdo3P71BdGa3z5vi1JLNLjX_PKuYwrC1XlXH2JR_P4gHlxmVw';
  tenantId:string='fe_0421';
  
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let myRequest:HttpRequest<any> = request;
    myRequest=request.clone({
      headers:request.headers.set('Authorization', 'Bearer '+this.bearerAuth).set('X-TENANT-ID', this.tenantId)
    });
    
    return next.handle(myRequest);
  }
}
