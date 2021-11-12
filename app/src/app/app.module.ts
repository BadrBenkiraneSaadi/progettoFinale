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
import { NewclienteComponent } from './components/newcliente/newcliente.component';
import { DettaglioClienteComponent } from './components/dettaglio-cliente/dettaglio-cliente.component';
import { DettaglioFattureComponent } from './components/dettaglio-fatture/dettaglio-fatture.component';
import { NewfatturaComponent } from './components/newfattura/newfattura.component';
import { RicercaComponent } from './components/ricerca/ricerca.component';

@NgModule({
  declarations: [
    AppComponent,
    MyheaderComponent,
    ClientiComponent,
    FattureComponent,
    NewclienteComponent,
    DettaglioClienteComponent,
    DettaglioFattureComponent,
    NewfatturaComponent,
    RicercaComponent
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
