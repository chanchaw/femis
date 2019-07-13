import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class DeliveryType{
  sid:string;
  oprimary:string;
}

const contextPath:string = 'http://localhost:8080/femisnsb';
const pre:string="/deliveryType";

@Injectable({
  providedIn: 'root'
})
export class DeliverytypeService {

  url = {
    'insert':contextPath + pre + '/insert',
    'deleteByPrimaryKey':contextPath + pre + '/deleteByPrimaryKey',
    'updateByPrimaryKey':contextPath + pre + '/updateByPrimaryKey',
    'getByPrimary':contextPath + pre + '/getByPrimary',
    'getAll':contextPath + pre + '/getAll'
  }
  constructor(
    private http:HttpClient
  ) { }

  insert(record:DeliveryType):Observable<number>{
    return this.http.post<number>(this.url.insert,record);
  }

  deleteByPrimaryKey(key:string):Observable<number>{
    return this.http.get<number>(this.url.deleteByPrimaryKey + '/' + key);
  }

  updateByPrimaryKey(record:DeliveryType):Observable<number>{
    return this.http.post<number>(this.url.updateByPrimaryKey,record);
  }

  getByPrimary(key:string):Observable<DeliveryType>{
    return this.http.get<DeliveryType>(this.url.getByPrimary + '/' + key);
  }

  getAll():Observable<DeliveryType[]>{
    return this.http.get<DeliveryType[]>(this.url.getAll);
  }

}
