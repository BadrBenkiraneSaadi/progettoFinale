import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IFatture } from 'src/app/interfaces/ifatture';
import { SClientiService } from 'src/app/services/sclienti.service';
import { SFattureService } from 'src/app/services/sfatture.service';

@Component({
  selector: 'app-dettaglio-fatture',
  templateUrl: './dettaglio-fatture.component.html',
  styleUrls: ['./dettaglio-fatture.component.css']
})
export class DettaglioFattureComponent implements OnInit {
  stato:boolean = false;
  fattura:IFatture={
    data: '',
    numero: 0,
    anno: 0,
    importo: 0,
    stato: {
      id: undefined,
      nome: ''
    },
    cliente: {
      id: undefined,
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
    }
  };
  constructor(private SFatture:SFattureService, private route:ActivatedRoute) {
    this.caricaElemento();
  }

  caricaElemento():void{
    this.route.params.subscribe(element => {
      let x = element['id'];
      if (x) {
        console.log(x);
        this.SFatture.getFatturaById(x).subscribe(res=>{
          this.fattura=res;
          if(res.stato.nome==='NON PAGATA'){
            this.stato=true;
          }
        });
      }
    });
  }

  ngOnInit(): void {
  }

  
}
