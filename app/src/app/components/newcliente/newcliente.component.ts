import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IApi } from 'src/app/interfaces/iapi';
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



  async creaCliente(): Promise<void> {
    console.log(this.nuovoCliente);


    await this.checkProvincia(this.nuovoCliente.indirizzoSedeLegale.comune.provincia.nome, this.nuovoCliente.indirizzoSedeLegale.comune.provincia.sigla);
    await this.checkProvincia(this.nuovoCliente.indirizzoSedeOperativa.comune.provincia.nome, this.nuovoCliente.indirizzoSedeOperativa.comune.provincia.nome);
    await this.setComuni();
    console.log(this.nuovoCliente);
    this.SClienti.postCliente(this.nuovoCliente).subscribe(response => {
      this.router.navigate(['/cliente']);
      console.log(response);
    });
  }

  checkProvincia(sedeNome: string, sedeSigla: string) {
    return new Promise<void>(resolve => {
      this.SProvince.getAllProvince().subscribe(res => {
        let province: IProvince[] = res.content;
        let provincia: boolean = false;

        for (const prov of province) {
          if (prov.nome == sedeNome) {
            provincia = true;
          }
        }
        console.log(provincia);

        if (!provincia) {
          this.SProvince.postProvincia({
            nome: sedeNome,
            sigla: sedeSigla
          }).subscribe(res => {
            console.log(res);
            resolve();
          });
        } else {
          resolve();
        }
      });
    })

  }

  setComuni() {
    return new Promise<void>(resolve => {
      this.SProvince.getAllProvince().subscribe(async (res: IApi) => {
        let province: IProvince[] = res.content;

        province.forEach(element => {
          if (element.nome == this.nuovoCliente.indirizzoSedeLegale.comune.provincia.nome) {
            if (element.id) {
              this.nuovoCliente.indirizzoSedeLegale.comune.provincia.id = element.id
            }
          }
          if (element.nome == this.nuovoCliente.indirizzoSedeOperativa.comune.provincia.nome) {
            if (element.id) {
              this.nuovoCliente.indirizzoSedeOperativa.comune.provincia.id = element.id;
            }
          }
        });

        if (this.nuovoCliente.indirizzoSedeOperativa.comune.provincia.id) {
          this.nuovoCliente.indirizzoSedeOperativa.comune.id = await this.checkComuni(this.nuovoCliente.indirizzoSedeOperativa.comune.nome, this.nuovoCliente.indirizzoSedeOperativa.comune.provincia.id)
          console.log(this.nuovoCliente.indirizzoSedeOperativa.comune.id)
        }
        if (this.nuovoCliente.indirizzoSedeLegale.comune.provincia.id) {
          this.nuovoCliente.indirizzoSedeLegale.comune.id = await this.checkComuni(this.nuovoCliente.indirizzoSedeLegale.comune.nome, this.nuovoCliente.indirizzoSedeLegale.comune.provincia.id)

        }
        resolve();
      });
    });
  }

  checkComuni(sedeNome: string, idProvinciaSede: number): any {
    return new Promise<number>(resolve => {
      this.SComuni.getAllComuni().subscribe(resp => {
        let comuni: IComuni[] = resp.content;
        let idcomune: number = 0;;
        let comune: boolean = false;

        for (const element of comuni) {
          if (element.nome == sedeNome) {
            comune = true;
            if (element.id) {
              idcomune = element.id
            }
          }
        }

        /* comuni.forEach(element => {
          if (element.nome == sedeNome) {
            comune = true;
            if (element.id) {
              idcomune = element.id
            }
          }
        }); */

        if (comune == false) {

          this.SComuni.postComune({
            nome: sedeNome,
            provincia: {
              id: idProvinciaSede
            }
          }).subscribe(respo => {
            console.log(respo);
            if (respo.id) {
              idcomune = respo.id;
            }
            console.log(idcomune);
            resolve(idcomune);
          });
        } else {
          resolve(idcomune);
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
        this.router.navigate(['/cliente']);
      })
    }
  }
}
