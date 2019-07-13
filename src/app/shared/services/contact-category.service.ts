import { SingleString } from './model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//#region Model
export class ContactCategory{
  rowIndex:number;
  sid:string;
  name:string;
  pid:number;
  serialno:number;
  status:number;
  createdate:Date;
  updatetime:Date;
  hide:number;
  seq:number;
}
//#endregion

//#region 请求URL
const contextPath:string = 'http://localhost:8080/femisnsb';
const pre:string="/ContactCategory";

// class Url{
//   static getAll:string = contextPath + pre + '/getAllValid';
// }
//#endregion

@Injectable({
  providedIn: 'root'
})
export class ContactCategoryService {
  public url = {
    'getAll':contextPath + pre + '/getAllValid',
    'getCategoryNames':contextPath + pre + '/getCategoryNames'
  }

  constructor(
    private http:HttpClient
  ) { }
  
  getAll():Observable<ContactCategory[]>{
    return this.http.get<ContactCategory[]>(this.url.getAll);
  }

  getCategoryNames(categories:string):Observable<SingleString>{
    let url = this.url.getCategoryNames + '/' + categories;
    console.log("获取分类名称的url:" + url);
    return this.http.get<SingleString>(url);
  }

}
