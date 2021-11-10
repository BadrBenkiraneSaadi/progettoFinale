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

  bearerAuth:string='eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTYzNjU2MTcyMiwiZXhwIjoxNjM3NDI1NzIyfQ.gv-IvH3mXHNQ1Pq6SQexmaxwo5__PlYAAlMGJIrjoMDdUfCJSkAFQIFZZKRPf8oXoBb3N2XAT-zXHi_kyi_h_g';
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
