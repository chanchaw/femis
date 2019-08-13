import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const contextPath:string = 'http://localhost:8080/femisnsb';
const pre:string="/ReportServer?reportlet=";


@Injectable({
  providedIn: 'root'
})
export class FineReportService {

  billReport = {
    "febricOrder" : contextPath + pre + "面料订单单据.cpt&mainId=",
  }
  constructor(
    private http:HttpClient
  ) { }

  printBillReport(mainId:number):Observable<any>{
    const url = this.billReport.febricOrder + mainId.toString();
    alert("打印报表的请求URL=" + url);
    return this.http.get(url);
  }
}
