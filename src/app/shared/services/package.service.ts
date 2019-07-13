import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class Package{
  sid:string;
  oprimary:string;
}

const contextPath:string = 'http://localhost:8080/femisnsb';
const pre:string="/package";

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  url = {
    'insert':contextPath + pre + '/insert',
    'deleteBPK':contextPath + pre + '/deleteBPK',
    'updateBPK':contextPath + pre + '/updateBPK',
    'getBPK':contextPath + pre + '/getBPK',
    'getAll':contextPath + pre + '/getAll',
  }

  constructor(
    private http:HttpClient
  ) { }

  insert(record:Package):Observable<Package>{
    return this.http.post<Package>(this.url.insert,record);
  }

  deleteBPK(key:string):Observable<number>{
    return this.http.get<number>(this.url.deleteBPK + '/' + key);
  }

  updateBPK(record:Package):Observable<number>{
    return this.http.post<number>(this.url.updateBPK,record);
  }

  getBPK(key:string):Observable<Package>{
    return this.http.get<Package>(this.url.getBPK + '/' + key);
  }

  getAll():Observable<Package[]>{
    console.log("获取所有包装方式的URL是：" + this.url.getAll);
    return this.http.get<Package[]>(this.url.getAll);
  }
}
