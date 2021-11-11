import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IClienti } from 'src/app/interfaces/iclienti';
import { IFatture } from 'src/app/interfaces/ifatture';
import { SClientiService } from 'src/app/services/sclienti.service';
import { SFattureService } from 'src/app/services/sfatture.service';

@Component({
  selector: 'app-dettaglio-cliente',
  templateUrl: './dettaglio-cliente.component.html',
  styleUrls: ['./dettaglio-cliente.component.css']
})
export class DettaglioClienteComponent implements OnInit {
  cliente: IClienti = {
    ragioneSociale: '',
    partitaIva: '',
    tipoCliente: '',
    email: '',
    pec: '',
    telefono: '',
    nomeContatto: '',
    cognomeContatto: '',
    telefonoContatto: '',
    emailContatto: '',
    indirizzoSedeOperativa: {
      id: undefined,
      via: '',
      civico: '',
      cap: '',
      localita: '',
      comune: {
        id: undefined,
        nome: '',
        provincia: {
          id: undefined,
          nome: '',
          sigla: ''
        }
      }
    },
    indirizzoSedeLegale: {
      id: undefined,
      via: '',
      civico: '',
      cap: '',
      localita: '',
      comune: {
        id: undefined,
        nome: '',
        provincia: {
          id: undefined,
          nome: '',
          sigla: ''
        }
      }
    },
    dataInserimento: '',
    dataUltimoContatto: '',
    fatturatoAnnuale: 0
  };

  fatture: IFatture[] = [];
  fatturePagate: IFatture[] = [];
  fattureDaPagare: IFatture[] = [];

  constructor(
    private SClienti: SClientiService,
    private SFatture: SFattureService,
    private route: ActivatedRoute,
    private router: Router) {
    this.route.params.subscribe(element => {
      let x = element['id'];
      if (x) {
        console.log(x);
        this.SClienti.getClientiById(x).subscribe(response => {
          this.cliente = response;
          if (this.cliente.id) {
            this.SFatture.getFatturaByCliente(this.cliente.id.toString()).subscribe(res => {
              this.fatture = res.content;
              this.fattureDaPagare = this.fatture.filter(element => element.stato.nome == 'NON PAGATA');
              this.fatturePagate = this.fatture.filter(element => element.stato.nome == 'PAGATA');
            })
          }
        });
      }
    });
  }

  ngOnInit(): void {
  }

  delete(id: number | undefined): void {
    if (id) {
      this.SClienti.deleteClienti(id.toString()).subscribe(res => {
        this.router.navigate(['/cliente']);
      });
    }
  }
}
