import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const contextPath:string = 'http://localhost:8080/femisnsb';
const pre:string="/mySQLSysObj";

@Injectable({
  providedIn: 'root'
})
export class MysqlSysObjService {

  url = {
    getCols:contextPath + pre + "/getCols",
    getTables:contextPath + pre + "/getTables",
  }

  dataTypeMap = {
    "varchar":"string",
    "int":"number",
    "float":"number",
    "detetime":"string",
    "timestamp":"string"
  }

  constructor(
    private http:HttpClient
  ) { }

  getCols(schema:MySQLSchema):Observable<MySQLTableCols[]>{
    return this.http.post<MySQLTableCols[]>(this.url.getCols,schema);
  }

  getTables(tableName:string):Observable<MySQLTable[]>{
    var url = this.url.getTables + "/" + tableName;
    return this.http.get<MySQLTable[]>(url);
  }
}


export class MySQLSchema{
  table_schema:string;
  table_name:string;
}

export class MySQLTable{
  autoSeq:number;
  table_schema:string;
  table_name:string;
  engine:string;
  table_rows:number;
  table_collation:string;
  table_comment:string;
}

export class MySQLTableCols{
  autoSeq:number;
  table_shema:string;
  table_name:string;
  column_name:string;
  ordinal_position:number;
  column_default:string;
  data_type:string;
  column_comment:string;
}