import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IFatture } from 'src/app/interfaces/ifatture';
import { SFattureService } from 'src/app/services/sfatture.service';

@Component({
  selector: 'app-dettaglio-fatture',
  templateUrl: './dettaglio-fatture.component.html',
  styleUrls: ['./dettaglio-fatture.component.css']
})
export class DettaglioFattureComponent implements OnInit {
  stato:boolean = false;
  fattura!:IFatture;
  id:string=''

  constructor(private SFatture:SFattureService, private route:ActivatedRoute, private router:Router) {
    this.caricaElemento();
  }

  caricaElemento():void{
    this.route.params.subscribe(element => {
      this.id = element['id'];
      if (this.id) {
        console.log(this.id);
        this.SFatture.getFatturaById(this.id).subscribe(res=>{
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

  modificaStato(): void {
    this.fattura.stato.id=1;
    this.fattura.stato.nome='PAGATA';
    this.SFatture.putFattura(this.id,this.fattura).subscribe(res =>{
      console.log(res);
      this.caricaElemento();
    });
    this.stato=false;
  }

  delete(): void {
    
      this.SFatture.deleteFattura(this.id).subscribe(res => {
        this.router.navigate(['/cliente']);
      });
    
  }
}
