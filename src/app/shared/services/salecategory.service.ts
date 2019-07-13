import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class SaleCategory{
  sid:string;
  oprimary:string;
}

const contextPath:string = 'http://localhost:8080/femisnsb';
const pre:string="/saleCategory";

@Injectable({
  providedIn: 'root'
})
export class SalecategoryService {

  url = {
    'insert':contextPath + pre + '/insert',
    'deleteBPK':contextPath + pre + '/deleteBPK',
    'updateBPK':contextPath + pre + '/updateBPK',
    'getBPK':contextPath + pre + '/getBPK',
    'getAll':contextPath + pre + '/getAll'
  }
  constructor(
    private http:HttpClient
  ) { }

  insert(record:SaleCategory):Observable<SaleCategory>{
    return this.http.post<SaleCategory>(this.url.insert,record);
  }

  deleteBPK(key:string):Observable<number>{
    return this.http.get<number>(this.url.deleteBPK + '/key');
  }

  updateBPK(record:SaleCategory):Observable<number>{
    return this.http.post<number>(this.url.updateBPK,record);
  }

  getBPK(key:string):Observable<SaleCategory>{
    return this.http.get<SaleCategory>(this.url.getBPK + '/' + key);
  }

  getAll():Observable<SaleCategory[]>{
    return this.http.get<SaleCategory[]>(this.url.getAll);
  }
}
