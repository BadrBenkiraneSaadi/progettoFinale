import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyHttpInterceptorInterceptor } from './my-http-interceptor.interceptor';
import { MyheaderComponent } from './components/myheader/myheader.component';
import { ClientiComponent } from './components/clienti/clienti.component';
import { FormsModule } from '@angular/forms';
import { FattureComponent } from './components/fatture/fatture.component';

@NgModule({
  declarations: [
    AppComponent,
    MyheaderComponent,
    ClientiComponent,
    FattureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: MyHttpInterceptorInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
