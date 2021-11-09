import { IFatture } from './interfaces/ifatture';
import { SProvinceService } from './services/sprovince.service';
import { Component } from '@angular/core';
import { IProvince } from './interfaces/iprovince';
import { SFattureService } from './services/sfatture.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private SProvince: SProvinceService,private SFatture:SFattureService) { }
  x:IFatture={
    id: 1,
    data: "2020-12-16T10:15:35.538+00:00",
    numero: 1,
    anno: 2020,
    importo: 3244.92,
    stato: {
        id: 2,
        nome: "NON PAGATA"
    },
    cliente: {
        id: 1,
        ragioneSociale: "Brunosss-Romano SPA - EDIT",
        partitaIva: "14812266616",
        tipoCliente: "SRL",
        email: "rosalino.caruso@gmail.com",
        pec: "antonio.damico@gmail.com",
        telefono: "+38 855 62 44 5685",
        nomeContatto: "Sarita",
        cognomeContatto: "Serr",
        telefonoContatto: "380.260.3225",
        emailContatto: "armando.martinelli@hotmail.com",
        indirizzoSedeOperativa: {
            id: 2,
            via: "Contrada Gastone 4, Piano 4",
            civico: "698",
            cap: "38615",
            localita: "Vania del friuli",
            comune: {
                id: 1,
                nome: "LASTRA A SIGNA",
                provincia: {
                    id: 1,
                    nome: "FIRENZE",
                    sigla: "FI"
                }
            }
        },
        indirizzoSedeLegale: {
            id: 1,
            via: "Strada Ricci 55, Appartamento 58",
            civico: "925",
            cap: "65995",
            localita: "Ivonne umbro",
            comune: {
                id: 1,
                nome: "LASTRA A SIGNA",
                provincia: {
                    id: 1,
                    nome: "FIRENZE",
                    sigla: "FI"
                }
            }
        },
        dataInserimento: "2019-06-01T08:11:01.911+00:00",
        dataUltimoContatto: "2021-03-24T21:32:06.375+00:00",
        fatturatoAnnuale: 0
    }
};
  test(){
    this.SFatture.findFattura(this.x).subscribe(res=>{
      
      console.log(res);
    console.log(this.x);
    });
  }
}
