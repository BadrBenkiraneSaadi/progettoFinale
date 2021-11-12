import { Component, OnInit } from '@angular/core';
import { IClienti } from 'src/app/interfaces/iclienti';
import { IFatture } from 'src/app/interfaces/ifatture';
import { SClientiService } from 'src/app/services/sclienti.service';
import { SFattureService } from 'src/app/services/sfatture.service';

@Component({
  selector: 'app-ricerca',
  templateUrl: './ricerca.component.html',
  styleUrls: ['./ricerca.component.css']
})
export class RicercaComponent implements OnInit {
  cliRagioneSociale!: string;
  cliImportoDa!: number;
  cliImportoA!: number;
  cliDataDa!: string;
  cliDataA!: string;
  fattRagioneSociale!: string;
  fattImportoDa!: number;
  fattImportoA!: number;
  fattDataDa!: string;
  fattDataA!: string;
  clienti: IClienti[] = [];
  fatture: IFatture[] = [];
  cli: boolean = false;
  fa: boolean = false;


  constructor(
    private SClienti: SClientiService,
    private SFatture: SFattureService
  ) { }

  ngOnInit(): void {
  }

  clienteRagioneSociale() {
    this.cli = true;
    this.fa = false;

    this.SClienti.getClientiByRagioneSociale(this.cliRagioneSociale).subscribe(res => {
      this.clienti = res.content;
    })
  }

  clienteFatturato() {
    this.cli = true;
    this.fa = false;

    this.SClienti.getClientiByFatturatoAnnuale(this.cliImportoDa.toString(), this.cliImportoA.toString()).subscribe(res => {
      this.clienti = res.content;
    })
  }

  clienteData() {
    if (this.cliDataA < this.cliDataDa) {
      alert("Inserire la data nell'ordine corretto!");
    } else {
      this.cli = true;
      this.fa = false;
      this.SClienti.getClientiByDataInserimento(this.cliDataDa.slice(8, 10) + '.' + this.cliDataDa.slice(5, 7) + '.' + this.cliDataDa.slice(-10, -6), this.cliDataA.slice(8, 10) + '.' + this.cliDataA.slice(5, 7) + '.' + this.cliDataA.slice(-10, -6))
        .subscribe(res => {
          this.clienti = res.content;
        })
    }
  }

  /*-------------------------------------------*/

  fatturaRagioneSociale() {
    this.cli = false;
    this.fa = true;

    this.SClienti.getClientiByRagioneSociale(this.fattRagioneSociale).subscribe(res => {
      this.clienti = res.content;
      this.fatture = []
      for (const element of this.clienti) {
        if (element.id) {
          this.SFatture.getFatturaByCliente(element.id.toString()).subscribe(resp => {
            for (const el of resp.content) {
              this.fatture.push(el);
            }
          });
        }
      }
    })
  }

  fatturaImporto() {
    this.cli = false;
    this.fa = true;

    this.SFatture.getFatturaByImportoBetween(this.fattImportoDa.toString(), this.fattImportoA.toString())
      .subscribe(res => {
        this.fatture = res.content;
      });
  }

  fatturaData() {
    if (this.fattDataA < this.fattDataDa) {
      alert("Inserire la data nell'ordine corretto!");
    } else {
      this.cli = false;
      this.fa = true;

      this.SFatture.getFatturaByDataBetween(this.fattDataDa.slice(8, 10) + '.' + this.fattDataDa.slice(5, 7) + '.' + this.fattDataDa.slice(-10, -6), this.fattDataA.slice(8, 10) + '.' + this.fattDataA.slice(5, 7) + '.' + this.fattDataA.slice(-10, -6))
        .subscribe(res => {
          this.fatture = res.content;
        });
    }
  }
}
