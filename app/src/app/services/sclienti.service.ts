import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IApi } from '../interfaces/iapi';
import { IClienti } from '../interfaces/iclienti';

@Injectable({
  providedIn: 'root'
})
export class SClientiService {
  private urlApiAll=environment.urlApi+'/api/clienti?&sort=id,ASC';
  private urlApi=environment.urlApi+'/api/clienti/';

  constructor(private http:HttpClient) { }

  getAllClienti() {
    return this.http.get<IApi>(this.urlApiAll);
  }

  getClientiById(from:string,to:string) {
    return this.http.get<IClienti>(this.urlApi+'fatturatoannuale?from='+from+'&to='+to);
  }

  getClientiByDataInserimento(from:string,to:string) {
    return this.http.get<IClienti>(this.urlApi+'datainserimento?from='+from+'&to='+to);
  }

  getClientiByDataUltimoContatto(from:string,to:string) {
    return this.http.get<IClienti>(this.urlApi+'dataultimocontatto?from='+from+'&to='+to);
  }
  
  getClientiByRagioneSociale(data:string) {
    return this.http.get<IClienti>(this.urlApi+'ragionesociale?nome='+data);
  }

  getClientiByFatturatoAnnuale(id:string){
    return this.http.get<IClienti>(this.urlApi+id);
  }

  postClienti(item:IClienti){
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
