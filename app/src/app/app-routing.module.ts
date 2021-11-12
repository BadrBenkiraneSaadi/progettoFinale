import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientiComponent } from './components/clienti/clienti.component';
import { DettaglioClienteComponent } from './components/dettaglio-cliente/dettaglio-cliente.component';
import { DettaglioFattureComponent } from './components/dettaglio-fatture/dettaglio-fatture.component';
import { FattureComponent } from './components/fatture/fatture.component';
import { LoginComponent } from './components/login/login.component';
import { NewclienteComponent } from './components/newcliente/newcliente.component';
import { NewfatturaComponent } from './components/newfattura/newfattura.component';
import { RicercaComponent } from './components/ricerca/ricerca.component';
import { RouteGuardService } from './services/route-guard.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LoginComponent
  },
  {
    path: 'cliente',
    component: ClientiComponent,
    canActivate: [RouteGuardService]
  },
  {
    path:'cliente/dettaglio/:id',
    component: DettaglioClienteComponent,
    canActivate: [RouteGuardService]
  },
  {
    path:'cliente/modifica/:id',
    component: NewclienteComponent,
    canActivate: [RouteGuardService]
  },
  {
    path:'newclient',
    component:NewclienteComponent,
    canActivate: [RouteGuardService]
  },
  {
    path:'fatture',
    component: FattureComponent,
    canActivate: [RouteGuardService]
  },
  {
    path:'fattura/dettaglio/:id',
    component: DettaglioFattureComponent,
    canActivate: [RouteGuardService]
  },
  {
    path:'fattura/:modifica/:id',
    component: NewfatturaComponent,
    canActivate: [RouteGuardService]
  },
  {
    path:'newfattura/:id',
    component:NewfatturaComponent,
    canActivate: [RouteGuardService]
  },
  {
    path:'ricerca',
    component:RicercaComponent,
    canActivate: [RouteGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
