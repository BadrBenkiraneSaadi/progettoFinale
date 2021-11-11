import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  tipo: string[] = [];
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
      via: '',
      civico: '',
      cap: '',
      localita: '',
      comune: {
        nome: '',
        provincia: {
          nome: '',
          sigla: ''
        }
      }
    },
    indirizzoSedeLegale: {
      via: '',
      civico: '',
      cap: '',
      localita: '',
      comune: {
        nome: '',
        provincia: {
          nome: '',
          sigla: ''
        }
      }
    },
    dataInserimento: '',
    dataUltimoContatto: ''
  }

  add: boolean = false;
  put: boolean = false;

  constructor(
    private SProvince: SProvinceService,
    private SComuni: SComuniService,
    private SClienti: SClientiService,
    private router: Router,
    private route: ActivatedRoute,
  ) {

    let data = new Date();
    this.nuovoCliente.dataInserimento = data.getFullYear() + "-" + data.getMonth() + "-" + ('0' + data.getDate()).slice(-2) + "T" + ('0' + data.getHours()).slice(-2) + ":" + ('0' + data.getMinutes()).slice(-2) + ":" + data.getSeconds() + "." + data.getMilliseconds() + "+00:00";
    this.nuovoCliente.dataUltimoContatto = data.getFullYear() + "-" + data.getMonth() + "-" + ('0' + data.getDate()).slice(-2) + "T" + ('0' + data.getHours()).slice(-2) + ":" + ('0' + data.getMinutes()).slice(-2) + ":" + data.getSeconds() + "." + data.getMilliseconds() + "+00:00";
    this.caricaTipo();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.put = true;
        this.SClienti.getClientiById(params['id']).subscribe(res => {
          this.nuovoCliente = res;
        });
      } else {
        this.add = true;
      }
    });
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

      if (provinciaLegale == false) {
        this.SProvince.postProvincia({
          nome: this.nuovoCliente.indirizzoSedeLegale.comune.provincia.nome,
          sigla: this.nuovoCliente.indirizzoSedeLegale.comune.provincia.sigla
        }).subscribe(res => {
          console.log(res);
        });
      }
      if (provinciaOperativa == false) {
        this.SProvince.postProvincia({
          nome: this.nuovoCliente.indirizzoSedeOperativa.comune.provincia.nome,
          sigla: this.nuovoCliente.indirizzoSedeOperativa.comune.provincia.sigla
        }).subscribe(res => {
          console.log(res);
          this.setComuni();
        });
      }
      else {
        this.setComuni();
      }

    });
  }

  setComuni() {
    this.SProvince.getAllProvince().subscribe(res => {
      let nuovoidlegale: number = 0;
      let nuovoidoperativa: number = 0;
      let province: IProvince[] = res.content;

      province.forEach(element => {
        if (element.nome == this.nuovoCliente.indirizzoSedeLegale.comune.provincia.nome) {
          if (element.id) {
            nuovoidlegale = element.id
          }
        }
        if (element.nome == this.nuovoCliente.indirizzoSedeOperativa.comune.provincia.nome) {
          if (element.id) {
            nuovoidoperativa = element.id;
          }
        }
      });

      this.nuovoCliente.indirizzoSedeLegale.comune.provincia.id = nuovoidlegale;
      this.nuovoCliente.indirizzoSedeOperativa.comune.provincia.id = nuovoidoperativa;

      this.SComuni.getAllComuni().subscribe(resp => {
        let comuni: IComuni[] = resp.content;
        let idcomunilegale: number = 0;
        let idcomunioperativa: number = 0;
        let comuneLegale: boolean = false;
        let comuneOperativa: boolean = false;

        comuni.forEach(element => {
          if (element.nome == this.nuovoCliente.indirizzoSedeLegale.comune.nome) {
            comuneLegale = true;
            if (element.id) {
              idcomunilegale = element.id
            }
          }
          if (element.nome == this.nuovoCliente.indirizzoSedeOperativa.comune.nome) {
            comuneOperativa = true;
            if (element.id) {
              idcomunioperativa = element.id
            }
          }
        });

        if (comuneLegale == false) {

          this.SComuni.postComune({
            nome: this.nuovoCliente.indirizzoSedeLegale.comune.nome,
            provincia: {
              id: nuovoidlegale
            }
          }).subscribe(respo => {
            console.log(respo);
            this.nuovoCliente.indirizzoSedeLegale.comune.id = respo.id;
          });
        }
        if (comuneOperativa == false) {
          this.SComuni.postComune({
            nome: this.nuovoCliente.indirizzoSedeOperativa.comune.nome,
            provincia: {
              id: nuovoidoperativa
            }
          }).subscribe(respo => {
            console.log(respo);
            this.nuovoCliente.indirizzoSedeOperativa.comune.id = respo.id;
            this.SClienti.postCliente(this.nuovoCliente).subscribe(response => {
              this.router.navigate(['/']);
              console.log(response);
            });
          });
        }
        else {
          this.nuovoCliente.indirizzoSedeLegale.comune.id = idcomunilegale;
          this.nuovoCliente.indirizzoSedeOperativa.comune.id = idcomunioperativa;
          this.SClienti.postCliente(this.nuovoCliente).subscribe(response => {
            this.router.navigate(['/']);
            console.log(response);
          });
        }
      });
    });
  }

  caricaTipo() {
    this.SClienti.getTipoClienti().subscribe(res => {
      this.tipo = res;
    });
  }

  modificaCliente() {
    if (this.nuovoCliente.id) {
      this.SClienti.putClienti(this.nuovoCliente.id.toString(), this.nuovoCliente).subscribe(res => {
        console.log(res);
        this.router.navigate(['/']);
      })
    }
  }
}
