import { Component, OnInit } from '@angular/core';
import { IClienti } from 'src/app/interfaces/iclienti';
import { IComuni } from 'src/app/interfaces/icomuni';
import { IProvince } from 'src/app/interfaces/iprovince';
import { SClientiService } from 'src/app/services/sclienti.service';
import { SComuniService } from 'src/app/services/scomuni.service';
import { SProvinceService } from 'src/app/services/sprovince.service';

@Component({
  selector: 'app-newcliente',
  templateUrl: './newcliente.component.html',
  styleUrls: ['./newcliente.component.css']
})
export class NewclienteComponent implements OnInit {
  nuovoCliente: IClienti = {
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
  constructor(private SProvince: SProvinceService, private SComuni: SComuniService, private SClienti: SClientiService) { }

  ngOnInit(): void {
    let data=new Date();
    this.nuovoCliente.dataInserimento= data.getFullYear()+"-"+data.getMonth()+"-"+data.getDay()+"T"+data.getHours()+":"+data.getMinutes()+":"+data.getMilliseconds();
  }

  creaCliente(): void {
    console.log(this.nuovoCliente);
    this.SProvince.getAllProvince().subscribe(res => {
      let province: IProvince[] = res.content;
      let provinciaLegale: boolean = false;
      let provinciaOperativa: boolean = false;

      province.forEach(element => {
        if (element.nome == this.nuovoCliente.indirizzoSedeLegale.comune.provincia.nome) {
          provinciaLegale = true;
        }
        if (element.nome == this.nuovoCliente.indirizzoSedeOperativa.comune.provincia.nome) {
          provinciaOperativa = true;
        }
      });

      if (provinciaLegale == false || provinciaOperativa == false) {
        this.SProvince.postProvincia({
          nome: this.nuovoCliente.indirizzoSedeLegale.comune.provincia.nome,
          sigla: this.nuovoCliente.indirizzoSedeLegale.comune.provincia.sigla
        })
          .subscribe(res => console.log(res));
      }
      this.SComuni.getAllComuni().subscribe(resp => {
        let comuni: IComuni[] = resp.content;
        let comuneLegale: boolean = false;
        let comuneOperativa: boolean = false;

        comuni.forEach(element => {
          if (element.nome == this.nuovoCliente.indirizzoSedeLegale.comune.nome) {
            comuneLegale = true;
          }
          if (element.nome == this.nuovoCliente.indirizzoSedeOperativa.comune.nome) {
            comuneOperativa = true;
          }
        });

        if (comuneLegale == false || comuneOperativa == false) {

          this.SComuni.postComune({
            nome: this.nuovoCliente.indirizzoSedeLegale.comune.nome,
            provincia: {
              nome: this.nuovoCliente.indirizzoSedeLegale.comune.provincia.nome
            }
          }).subscribe(respo => {
            console.log(respo);
            this.SClienti.postCliente(this.nuovoCliente).subscribe(response=> console.log(response));
          });
        }else{
          this.SClienti.postCliente(this.nuovoCliente).subscribe(response=> console.log(response));
        }

        
      });
    });
  }
}
