import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUtente } from 'src/app/interfaces/iutente';
import { RouteGuardService } from 'src/app/services/route-guard.service';
import { SUtenteService } from 'src/app/services/sutente.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  allUtenti!:IUtente[];
  username!:string;
  password!:string;
  logUser:boolean=false;
  messaggio:string='';

  constructor(
    private SUtente:SUtenteService,
    private RouteGuard:RouteGuardService,
    private router:Router) { }

  ngOnInit(): void {
  }
  
  async log(){
    console.log(this.username);
    console.log(this.password);

    try {
      await this.takeBearerAuth();

    }catch(err){
      console.log(err);
      this.messaggio='Username o Password errati';
    }

    console.log(this.SUtente.getToken());
  }

  takeBearerAuth(){
    return new Promise<void>((resolve,reject) => {
      this.SUtente.logIn(this.username,this.password)?.subscribe(res=>{
        this.SUtente.setBearer(res.accessToken);
        if(this.SUtente.getToken()){
          console.log(this.SUtente.getToken());
          this.RouteGuard.setLogin();
          this.router.navigate(['/cliente']);
        }
        resolve();
      },err=>{
        reject(err);
      }
      );
    })
  }
}
