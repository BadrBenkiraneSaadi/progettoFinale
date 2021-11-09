import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IApi } from '../interfaces/iapi';
import { IFatture } from '../interfaces/ifatture';

@Injectable({
  providedIn: 'root'
})
export class SFattureService {
  private urlApiAll=environment.urlApi+'/api/fatture?&sort=id,ASC';
  private urlApi=environment.urlApi+'/api/fatture/';

  constructor(private http:HttpClient) { }

  getAllFattura() {
    return this.http.get<IApi>(this.urlApiAll);
  }

  getFatturaById(id:string){
    return this.http.get<IFatture>(this.urlApi+id);
  }

  getFatturaByCliente(id:string){
    return this.http.get<IFatture>(this.urlApi+'cliente/'+id+'?&sort=id,ASC');
  }

  getFatturaByStato(id:string){
    return this.http.get<IFatture>(this.urlApi+'stato/'+id+'?&sort=id,ASC');
  }

  getFatturaByAnno(id:string){
    return this.http.get<IFatture>(this.urlApi+'anno/'+id+'?&sort=id,ASC');
  }

  getFatturaByDataBetween(from:string,to:string){
    return this.http.get<IFatture>(this.urlApi+'data/?from='+from+'&to='+to+'&sort=id,ASC');
  }

  getFatturaByImportoBetween(from:string,to:string){
    return this.http.get<IFatture>(this.urlApi+'importo/?from='+from+'&to='+to+'&sort=id,ASC');
  }

  postFattura(item:IFatture){
    return this.http.post(this.urlApi, item);
  }

  findFattura(item:IFatture){
    return this.http.post(this.urlApi+'find', item);
  }

  putFattura(id:string,item:IFatture){
    return this.http.put(this.urlApi+id, item);
  }

  deleteFattura(id:string){
    return this.http.delete(this.urlApi+id);
  }

  deleteFatturaByCliente(id:string){
    return this.http.delete(this.urlApi+'cliente/'+id);
  }
}