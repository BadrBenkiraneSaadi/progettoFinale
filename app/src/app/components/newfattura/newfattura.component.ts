import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IFatture } from 'src/app/interfaces/ifatture';
import { SFattureService } from 'src/app/services/sfatture.service';

@Component({
  selector: 'app-newfattura',
  templateUrl: './newfattura.component.html',
  styleUrls: ['./newfattura.component.css']
})
export class NewfatturaComponent implements OnInit {

  nuovaFattura!: {
    id?: number
    data: string,
    numero: number,
    anno: number,
    importo: number,
    stato: {
      id?: number,
      nome: string,
    },
    cliente: {
      id?: number
    }
  }
  
  add: boolean = false;
  put: boolean = false;

  modFattura!:IFatture;

  constructor(private SFatture: SFattureService, private route: ActivatedRoute, private router: Router) {
    let data = new Date();
    this.route.params.subscribe(params => {
      if (params['modifica']) {
        this.put=true;
        if (params['id']) {
          this.SFatture.getFatturaById(params['id']).subscribe(res => {
            this.modFattura = res;
            this.nuovaFattura = {
              id: res.id,
              data: res.data,
              numero: res.numero,
              anno: res.anno,
              importo: res.importo,
              stato: {
                id: res.stato.id,
                nome: res.stato.nome,
              },
              cliente: {
                id: res.cliente.id
              }
            }
          })
        }
      } else {
        this.add=true;
        if (params['id']) {
          this.nuovaFattura = {
            data: data.getFullYear() + "-" + data.getMonth() + "-" + ('0' + data.getDate()).slice(-2) + "T" + ('0' + data.getHours()).slice(-2) + ":" + ('0' + data.getMinutes()).slice(-2) + ":" + data.getSeconds() + "." + data.getMilliseconds() + "+00:00",
            numero: 0,
            anno: 2015,
            importo: 0,
            stato: {
              id: 1,
              nome: 'PAGATA',
            },
            cliente: {
              id: parseInt(params['id'])
            }
          }
        }
      }
    });
  }

  ngOnInit(): void {
  };

  creaFattura() {
    if (this.nuovaFattura.stato.nome == 'NON PAGATA') {
      this.nuovaFattura.stato.id = 2;
    }
    console.log(this.nuovaFattura)
    this.SFatture.postFattura(this.nuovaFattura).subscribe(res => {
      console.log(res);
      this.router.navigate(['/']);
    });
  }

  modificaFattura() {
    if(this.nuovaFattura.id){
     
        this.modFattura.data= this.nuovaFattura.data;
        this.modFattura.numero= this.nuovaFattura.numero;
        this.modFattura.anno= this.nuovaFattura.anno;
        this.modFattura.importo= this.nuovaFattura.importo;
        this.modFattura.stato.nome= this.nuovaFattura.stato.nome;
        if (this.nuovaFattura.stato.nome == 'NON PAGATA') {
          this.modFattura.stato.id = 2;
        }else{
          this.modFattura.stato.id = 1;
        }
      
      this.SFatture.putFattura(this.nuovaFattura.id.toString(),this.modFattura).subscribe(res => {
        console.log(res);
      this.router.navigate(['/']);
      })
    }
  }
}
