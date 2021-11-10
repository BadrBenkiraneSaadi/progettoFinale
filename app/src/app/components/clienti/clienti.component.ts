import { Component, OnInit } from '@angular/core';
import { IClienti } from 'src/app/interfaces/iclienti';
import { SClientiService } from 'src/app/services/sclienti.service';

@Component({
  selector: 'app-clienti',
  templateUrl: './clienti.component.html',
  styleUrls: ['./clienti.component.css']
})
export class ClientiComponent implements OnInit {
  clienti:IClienti[]=[];

  constructor(private SClienti:SClientiService) {
    this.caricaClienti();
  }

  caricaClienti() {
    this.SClienti.getAllClienti().subscribe(res => {
      let aux:IClienti[]=res.content;
      this.clienti= aux.filter(clienti => clienti.indirizzoSedeLegale!=null);
      console.log(this.clienti);
    });
  }

  ngOnInit(): void {
  }

  delete(id:number): void {
    console.log(id);
    this.SClienti.deleteClienti(id.toString()).subscribe(res => console.log(res));
    this.caricaClienti();
  }
}
