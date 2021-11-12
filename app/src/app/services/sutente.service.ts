import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IApi } from '../interfaces/iapi';
import { IUtente } from '../interfaces/iutente';

@Injectable({
  providedIn: 'root'
})
export class SUtenteService {
  private urlApi=environment.urlApi;
  private bearerAuth!:string;

  constructor(private http:HttpClient) { }

  getAllUsers(){
    return this.http.get<IApi>(this.urlApi+'/api/users?size=10000');
  }

  signUp(item:IUtente){
    return this.http.post(this.urlApi+'/api/auth/signup', item);
  }

  logIn(user:string, pass:string){
    return this.http.post<IUtente>(this.urlApi+'/api/auth/login', {username:user,password:pass});
  }

  getToken():string{
    return this.bearerAuth;
  }

  setBearer(token:string){
    this.bearerAuth=token;
    console.log('ora');
  }
}
