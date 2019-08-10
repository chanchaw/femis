import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SingleString } from '.';


const contextPath:string = 'http://localhost:8080/femisnsb';
const pre:string="/continuous";


@Injectable({
  providedIn: 'root'/*  */
})
export class ContinuousService {

  constructor(
    private http:HttpClient
  ) { }

  url = {
    getNewBillCode:contextPath + pre + "/getNewBillCode",
    isFabricBillcodeExists:contextPath + pre + "/isFabricBillcodeExists",
  }

  getNewBillCode(billSid:string):Observable<SingleString>{
    const url:string = this.url.getNewBillCode + "/" + billSid;
    return this.http.get<SingleString>(url);
  }

  isFabricBillcodeExists(codeid:string):Observable<boolean>{
    const url = this.url.isFabricBillcodeExists + '/' + codeid;
    return this.http.get<boolean>(url);
  }
}
