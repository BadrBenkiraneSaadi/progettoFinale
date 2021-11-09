import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IUtente } from '../interfaces/iutente';

@Injectable({
  providedIn: 'root'
})
export class SUtenteService {
  private urlApi=environment.urlApi;

  constructor(private http:HttpClient) { }

  getAllUsers(){
    return this.http.get<IUtente>(this.urlApi+'/api/users');
  }

  signUp(item:IUtente){
    return this.http.post(this.urlApi+'/api/auth/signup', item);
  }

  logIn(user:string, pass:string){
    return this.http.post(this.urlApi+'/api/auth/signup', {username:user,password:pass});
  }
}
