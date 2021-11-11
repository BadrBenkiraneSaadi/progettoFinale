import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IApi } from '../interfaces/iapi';
import { IClienti } from '../interfaces/iclienti';

@Injectable({
  providedIn: 'root'
})
export class SClientiService {
  private urlApiAll=environment.urlApi+'/api/clienti?page=0&size=2000&sort=id,ASC';
  private urlApi=environment.urlApi+'/api/clienti/';

  constructor(private http:HttpClient) { }

  getAllClienti() {
    return this.http.get<IApi>(this.urlApiAll);
  }

  getTipoClienti(){
    return this.http.get<string[]>(this.urlApi+'tipicliente');
  }

  getClientiById(id:string) {
    return this.http.get<IClienti>(this.urlApi+id);
  }

  getClientiByDataInserimento(from:string,to:string) {
    return this.http.get<IClienti>(this.urlApi+'datainserimento?from='+from+'&to='+to);
  }

  getClientiByDataUltimoContatto(from:string,to:string) {
    return this.http.get<IClienti>(this.urlApi+'dataultimocontatto?from='+from+'&to='+to);
  }
  
  getClientiByRagioneSociale(ragioneSociale:string) {
    return this.http.get<IClienti>(this.urlApi+'ragionesociale?nome='+ragioneSociale);
  }

  getClientiByFatturatoAnnuale(from:string,to:string) {
    return this.http.get<IClienti>(this.urlApi+'fatturatoannuale?from='+from+'&to='+to);
  }

  postCliente(item:IClienti){
    return this.http.post(this.urlApi, item);
  }

  findClienti(item:IClienti){
    return this.http.post(this.urlApi+'find', item);
  }

  putClienti(id:string,item:IClienti){
    return this.http.put(this.urlApi+id, item);
  }

  deleteClienti(id:string){
    return this.http.delete(this.urlApi+id);
  }
}
