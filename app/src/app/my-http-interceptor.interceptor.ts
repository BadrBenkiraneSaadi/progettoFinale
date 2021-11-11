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

  bearerAuth:string='eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTYzNjYzMzExNywiZXhwIjoxNjM3NDk3MTE3fQ.XYU6wg-LB6iVQG6rN__eg4gRG2Er2VtTbjG7UDRYHF8nz2Tms1ADSO-XmfuzHCHRykB-CNqUyLzA_FZOJ7kegw';
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
