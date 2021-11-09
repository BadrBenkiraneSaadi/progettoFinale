import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IApi } from '../interfaces/iapi';
import { IStatofattura } from '../interfaces/istatofattura';

@Injectable({
  providedIn: 'root'
})
export class SStatofatturaService {
  private urlApiAll=environment.urlApi+'/api/statifattura?sort=id,ASC';
  private urlApi=environment.urlApi+'/api/comuni/';

  constructor(private http:HttpClient) { }

  getAllStatoFattura() {
    return this.http.get<IApi>(this.urlApiAll);
  }

  getStatoFatturaById(id:string){
    return this.http.get<IStatofattura>(this.urlApi+id);
  }

  postStatoFattura(item:IStatofattura){
    return this.http.post(this.urlApi, item);
  }

  putStatoFattura(id:string,item:IStatofattura){
    return this.http.put(this.urlApi+id, item);
  }

  deleteStatoFattura(id:string){
    return this.http.delete(this.urlApi+id);
  }
}
