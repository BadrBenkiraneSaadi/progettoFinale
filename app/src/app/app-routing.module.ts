import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientiComponent } from './components/clienti/clienti.component';
import { DettaglioClienteComponent } from './components/dettaglio-cliente/dettaglio-cliente.component';
import { DettaglioFattureComponent } from './components/dettaglio-fatture/dettaglio-fatture.component';
import { FattureComponent } from './components/fatture/fatture.component';
import { NewclienteComponent } from './components/newcliente/newcliente.component';
import { NewfatturaComponent } from './components/newfattura/newfattura.component';

const routes: Routes = [
  /* {
    path: '',
    component: ClientiComponent
  }, */
  {
    path: 'cliente',
    pathMatch: 'full',
    component: ClientiComponent
  },
  {
    path:'cliente/dettaglio/:id',
    component: DettaglioClienteComponent
  },
  {
    path:'cliente/modifica/:id',
    component: NewclienteComponent
  },
  {
    path:'newclient',
    component:NewclienteComponent
  },
  {
    path:'fatture',
    component: FattureComponent
  },
  {
    path:'fattura/dettaglio/:id',
    component: DettaglioFattureComponent,
    //canActivate: true
  },
  {
    path:'fattura/:modifica/:id',
    component: NewfatturaComponent
  },
  {
    path:'newfattura/:id',
    component:NewfatturaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
