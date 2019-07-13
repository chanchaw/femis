import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class Settlement{
  sid:string;
  oprimary:string;
}

const contextPath:string = 'http://localhost:8080/femisnsb';
const pre:string="/settlement";


@Injectable({
  providedIn: 'root'
})
export class SettlementService {

  url = {
    'insert':contextPath + pre + '/insert',
    'deleteByPrimaryKey':contextPath + pre + '/deleteByPrimaryKey',
    'updateByPrimaryKey':contextPath + pre + '/updateByPrimaryKey',
    'updateBPKS':contextPath + pre + '/updateBPKS',
    'getByPrimaryKey':contextPath + pre + '/getByPrimaryKey',
    'getAll':contextPath + pre + '/getAll'
  }

  constructor(
    private http:HttpClient
  ) { }

  insert(record:Settlement):Observable<Settlement>{
    return this.http.post<Settlement>(this.url.insert,record);
  }

  deleteByPrimaryKey(key:string):Observable<number>{
    return this.http.get<number>(this.url.deleteByPrimaryKey + '/key');
  }

  updateByPrimaryKey(record:Settlement):Observable<number>{
    return this.http.post<number>(this.url.updateByPrimaryKey,record);
  }

  
  updateBPKS(record:Settlement):Observable<number>{
    return this.http.post<number>(this.url.updateBPKS,record);
  }



  getByPrimaryKey(key:string):Observable<Settlement>{
    return this.http.get<Settlement>(this.url.getByPrimaryKey + '/' + key);
  }


  getAll():Observable<Settlement[]>{
    return this.http.get<Settlement[]>(this.url.getAll);
  }
}
