import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//#region Model
export class ContactCompany{
  rowIndex:number;
  sid:string;
  name:string;
  code:string;
  alias:string;
  customer:string;
  parentid:number;
  bank:string;
  account:string;
  linkman:string;
  phone:string;
  address:string;
  status:number;
  oprimary:string;
  categories:string;
  categoryNames:string;
  updatedate:string;
}
//#endregion

//#region Url
const contextPath:string = 'http://localhost:8080/femisnsb';
const pre:string="/ContactCompany";
//#endregion

//#region 服务
@Injectable({
  providedIn: 'root'
})
export class ContactCompanyService {

  public url = { 
    'insert':contextPath + pre + '/insert',
    'deleteByPrimaryKey':contextPath + pre + "/deleteByPrimaryKey",
    'updateByPrimaryKey':contextPath + pre + "/updateByPrimaryKey",
    'updateSelective':contextPath + pre + "/updateSelective",
    'getByPrimaryKey':contextPath + pre + "/getByPrimaryKey",
    'getAll':contextPath + pre + "/getAll",
    'getAllValid':contextPath + pre + "/getAllValid"
  }

  constructor(
    private http:HttpClient
  ) { }

  insert(item:ContactCompany):Observable<number>{
    return this.http.post<number>(this.url.insert,item);
  }

  deleteByPrimaryKey(key:string):Observable<string>{
    return this.http.get<string>(this.url.deleteByPrimaryKey + '/' + key);
  }

  updateByPrimaryKey(item:ContactCompany):Observable<number>{
    return this.http.post<number>(this.url.updateByPrimaryKey,item);
  }
  
  updateSelective(item:ContactCompany):Observable<number>{
    return this.http.post<number>(this.url.updateSelective,item);
  }


  getByPrimaryKey(key:string):Observable<ContactCompany>{
    return this.http.get<ContactCompany>(this.url.getByPrimaryKey + '/' +key);
  }

  getAll():Observable<ContactCompany[]>{
    return this.http.get<ContactCompany[]>(this.url.getAll);
  }

  getAllValid():Observable<ContactCompany[]>{
    return this.http.get<ContactCompany[]>(this.url.getAllValid);
  }


}
//#endregion
