import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export class Packmanner{
  sid:string;
  oprimary:string;
}

const contextPath:string = 'http://localhost:8080/femisnsb';
const pre:string="/packmanner";

@Injectable({
  providedIn: 'root'
})
export class PackmannerService {

  url = {
    'insert':contextPath + '/' + pre + '/insert',
    'deleteBPK':contextPath + '/' + pre + '/deleteBPK',
    'updateBPK':contextPath + '/' + pre + '/updateBPK',
    'getBPK':contextPath + '/' + pre + '/getBPK',
    'getAll':contextPath + '/' + pre + '/getAll'

  }

  constructor(
    private http:HttpClient
  ) { }

  insert(record:Packmanner):Observable<number>{
    return this.http.post<number>(this.url.insert,record);
  }

  deleteBPK(key:string):Observable<number>{
    return this.http.get<number>(this.url.deleteBPK + '/' + key);
  }

  updateBPK(record:Packmanner):Observable<number>{
    return this.http.post<number>(this.url.updateBPK,record);
  }

  getBPK(key:string):Observable<Packmanner>{
    return this.http.get<Packmanner>(this.url.getBPK + '/' + key);
  }

  getAll():Observable<Packmanner[]>{
    console.log("获取所有数据的URL=" + this.url.getAll);
    return this.http.get<Packmanner[]>(this.url.getAll);
  }
}
