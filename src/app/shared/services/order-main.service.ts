import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class OrderMain{
  id:number;
  codeid:string;
  billdate:Date;
  deliverytime:Date;
  clientid:string;
  pactcode:string;
  deliverytype:string;
  invoice:number;
  operator:string;
  salesman:string;
  contractor:string;
  remark:string;
  status:number;
  updatedate:Date;
  updateuser:string;
  billtype:string;
  packmanner:string;
  createdate:Date;
  createtime:Date;
  creator:string;
  pactsum:number;
  settlement:string;
  salecategory:string;
}

const contextPath:string = 'http://localhost:8080/femisnsb';
const pre:string="/orderMain";

@Injectable({
  providedIn: 'root'
})
export class OrderMainService {

  url ={
    'insert':contextPath + pre + '/insert',
    'deleteByPrimaryKey':contextPath + pre + '/deleteByPrimaryKey',
    'updateByPrimaryKey':contextPath + pre + '/updateByPrimaryKey',
    'getByPrimaryKey':contextPath + pre + '/getByPrimaryKey',
    'getAllOrderCode':contextPath + pre + '/getAllOrderCode',
    'getAll':contextPath + pre + '/getAll',
    'getLast':contextPath + pre + '/getLast',
    'getFirst':contextPath + pre + '/getFirst',
    'getPrevious':contextPath + pre + '/getPrevious',
    'getNext':contextPath + pre + '/getNext',
    'save':contextPath + pre + '/save'
  }
  constructor(
    private http:HttpClient
  ) { }

  getLast():Observable<OrderMain>{
    return this.http.get<OrderMain>(this.url.getLast);
  }

  getFirst():Observable<OrderMain>{
    return this.http.get<OrderMain>(this.url.getFirst);
  }

  getPrevious(key:number):Observable<OrderMain>{
    return this.http.get<OrderMain>(this.url.getPrevious + '/' + key.toString());
  }

  getNext(key:number):Observable<OrderMain>{
    return this.http.get<OrderMain>(this.url.getNext + '/' + key.toString());
  }


  insert(record:OrderMain):Observable<number>{
    return this.http.post<number>(this.url.insert,record);
  }

  deleteByPrimaryKey(key:number):Observable<number>{
    return this.http.get<number>(this.url.deleteByPrimaryKey + '/' + key);
  }

  updateByPrimaryKey(record:OrderMain):Observable<number>{
    return this.http.post<number>(this.url.updateByPrimaryKey,record);
  }

  getByPrimaryKey(key:number):Observable<OrderMain>{
    return this.http.get<OrderMain>(this.url.getByPrimaryKey + '/' + key);
  }

  getAll():Observable<OrderMain[]>{
    return this.http.get<OrderMain[]>(this.url.getAll);
  }

  getAllOrderCode():Observable<string[]>{
    return this.http.get<string[]>(this.url.getAllOrderCode);
  }

  save(record:OrderMain):Observable<boolean>{
    return this.http.post<boolean>(this.url.save,record);
  }
}
