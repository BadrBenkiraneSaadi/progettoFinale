import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  cliente:IClienti={
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

  fatturePagate:IFatture[]=[];

  fattureDaPagare:IFatture[]=[];

  constructor(private SClienti:SClientiService, private SFatture:SFattureService, private route:ActivatedRoute) { 
    this.route.params.subscribe(element => {
      let x = element['id'];
      if (x) {
        console.log(x);
        this.SClienti.getClientiById(x).subscribe(response => {
          this.cliente = response;
        });
        this.SFatture.getFatturaByStato('1').subscribe(response => {
          let x:IFatture[] =response.content
          x=x.filter(fatture=>fatture.cliente==this.cliente);
          this.fatturePagate=x;
        });
        this.SFatture.getFatturaByStato('2').subscribe(response => {
          let x:IFatture[] =response.content
          x=x.filter(fatture=>fatture.cliente==this.cliente);
          this.fattureDaPagare=x;
        });
      }
    });
  }

  ngOnInit(): void {
  }

}
