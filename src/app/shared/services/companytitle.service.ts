import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class CompanyTitle{
  sid:string;
  oprimary:string;
}

const contextPath:string = 'http://localhost:8080/femisnsb';
const pre:string="/companyTitle";

@Injectable({
  providedIn: 'root'
})
export class CompanytitleService {

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

  insert(record:CompanyTitle):Observable<CompanyTitle>{
    return this.http.post<CompanyTitle>(this.url.insert,record);
  }

  deleteBPK(key:string):Observable<number>{
    return this.http.get<number>(this.url.deleteBPK + '/' + key);
  }

  updateBPK(record:CompanyTitle):Observable<number>{
    return this.http.post<number>(this.url.updateBPK,record);
  }

  getBPK(key:string):Observable<CompanyTitle>{
    return this.http.get<CompanyTitle>(this.url.getBPK + '/' + key);
  }

  getAll():Observable<CompanyTitle[]>{
    return this.http.get<CompanyTitle[]>(this.url.getAll);
  }
}
