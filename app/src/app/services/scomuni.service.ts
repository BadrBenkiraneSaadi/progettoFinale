import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IApi } from '../interfaces/iapi';
import { IComuni } from '../interfaces/icomuni';

@Injectable({
  providedIn: 'root'
})
export class SComuniService {
  private urlApiAll=environment.urlApi+'/api/comuni?sort=id,ASC';
  private urlApi=environment.urlApi+'/api/comuni/';

  constructor(private http:HttpClient) { }

  getAllComuni() {
    return this.http.get<IApi>(this.urlApiAll);
  }

  getComuneById(id:string){
    return this.http.get<IComuni>(this.urlApi+id);
  }

  postComune(item:IComuni){
    return this.http.post(this.urlApi, item);
  }

  putComune(id:string,item:IComuni){
    return this.http.put(this.urlApi+id, item);
  }

  deleteComune(id:string){
    return this.http.delete(this.urlApi+id);
  }
}
