import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IApi } from '../interfaces/iapi';
import { IProvince } from '../interfaces/iprovince';

@Injectable({
  providedIn: 'root'
})
export class SProvinceService {

  private urlApiAll=environment.urlApi+'/api/province?sort=id,ASC';
  private urlApi=environment.urlApi+'/api/province/';
  constructor(private http:HttpClient) { }

  getAllProvince() {
    return this.http.get<IApi>(this.urlApiAll);
  }

  getProvinciaById(id:string){
    return this.http.get<IProvince>(this.urlApi+id);
  }

  postProvincia(item:IProvince){
    return this.http.post<IProvince>(this.urlApi, item);
  }

  putProvincia(id:string,item:IProvince){
    return this.http.put(this.urlApi+id, item);
  }

  deleteProvincia(id:string){
    return this.http.delete(this.urlApi+id);
  }
}
