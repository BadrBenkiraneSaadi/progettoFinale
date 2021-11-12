import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SUtenteService } from './services/sutente.service';

@Injectable()
export class MyHttpInterceptorInterceptor implements HttpInterceptor {

  tenantId:string='fe_0421';
  
  constructor(private SUtnete: SUtenteService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let myRequest:HttpRequest<any> = request;
    if(this.SUtnete.getToken()){
      myRequest=request.clone({
        headers:request.headers.set('Authorization', 'Bearer '+this.SUtnete.getToken()).set('X-TENANT-ID', this.tenantId)
      });
      console.log('pippo');
    }else{
      myRequest=request.clone({
        headers:request.headers.set('X-TENANT-ID', this.tenantId)
      });
    }
    
    return next.handle(myRequest);
  }
}
