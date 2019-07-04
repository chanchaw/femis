import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// #region Model
export class TableStyle{
  iid:number;
  tablename:string;
  fieldname:string;
  caption:string;
  widthpercent:string;
  alignCaption:string;
  alignContent:string;
  display:string;
  visible:number;
  colwidth:number;
  fixed:number;
  dbname:string;
  seq:number;
  alignment:number;
  backcolor:string;
  forecolor:string;
  locked:number;  
  isquantity:number;
  sole:number;
  hide:number;
  notnull:number;
  createdate:Date;
  dataType:string;
}
// #endregion

@Injectable({
  providedIn: 'root'
})
export class TablestyleService {

  url = {
    'getSingleTable':'http://localhost:8080/femisnsb/tableStyle/getSingleTable'
  }

  constructor(
    private http:HttpClient
  ) { }

  getSingleTable(tableName:string):Observable<TableStyle[]>{
    return this.http.get<TableStyle[]>(this.url.getSingleTable + '/' + tableName);
  }
}
