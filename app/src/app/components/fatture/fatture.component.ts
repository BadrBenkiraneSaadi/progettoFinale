import { Component, OnInit } from '@angular/core';
import { IFatture } from 'src/app/interfaces/ifatture';
import { SFattureService } from 'src/app/services/sfatture.service';

@Component({
  selector: 'app-fatture',
  templateUrl: './fatture.component.html',
  styleUrls: ['./fatture.component.css']
})
export class FattureComponent implements OnInit {
  fatture:IFatture[]=[];
  filtro:string='Stato';

  constructor(private SFatture:SFattureService) {
    this.caricaFatture();
  }

  caricaFatture():void{
    this.SFatture.getAllFatture().subscribe(res => {
      this.fatture = res.content;
    });
  }

  ngOnInit(): void {
  }

  filtra():void{
    console.log(this.filtro);
    if(this.filtro=='PAGATA'){
      this.SFatture.getFatturaByStato('1').subscribe(res => {
        console.log(res);
        this.fatture = res.content;
      });
    }else if (this.filtro=='NON PAGATA'){
      this.SFatture.getFatturaByStato('2').subscribe(res => {
        this.fatture = res.content;
      });
    }else{
      this.caricaFatture();
    }
  }
}
