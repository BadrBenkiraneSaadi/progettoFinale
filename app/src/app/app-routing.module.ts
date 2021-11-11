import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientiComponent } from './components/clienti/clienti.component';
import { DettaglioClienteComponent } from './components/dettaglio-cliente/dettaglio-cliente.component';
import { DettaglioFattureComponent } from './components/dettaglio-fatture/dettaglio-fatture.component';
import { FattureComponent } from './components/fatture/fatture.component';
import { ModficaClienteComponent } from './components/modfica-cliente/modfica-cliente.component';
import { ModficaFatturaComponent } from './components/modfica-fattura/modfica-fattura.component';
import { NewclienteComponent } from './components/newcliente/newcliente.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ClientiComponent
  },
  {
    path:'cliente/dettaglio/:id',
    component: DettaglioClienteComponent
  },
  {
    path:'cliente/modifica/:id',
    component: ModficaClienteComponent
  },
  {
    path:'fatture',
    component: FattureComponent
  },
  {
    path:'fattura/dettaglio/:id',
    component: DettaglioFattureComponent
  },
  {
    path:'fattura/modifica/:id',
    component: ModficaFatturaComponent
  },
  {
    path:'newclient',
    component:NewclienteComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
