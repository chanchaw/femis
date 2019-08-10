import { concatMap } from 'rxjs/operators';
import { MySQLTableCols } from './../../../shared/services/mysql-sys-obj.service';
import { Component, OnInit } from '@angular/core';
import { MysqlSysObjService, MySQLTable, MySQLSchema } from 'src/app/shared/services/mysql-sys-obj.service';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  providers: [ MessageService,DatePipe ]
})
export class ContentComponent implements OnInit {

  // 左边网格的列 - 显示数据库所有表 - 所有列
  cols:ColModel[] = [
    { field:"autoSeq",header:"主键",visible:false},
    { field:"table_schema",header:"数据库",visible:false},
    { field:"table_name",header:"表名",visible:true},
    { field:"engine",header:"引擎",visible:false},
    { field:"table_rows",header:"表内行数",visible:false},
    { field:"table_collation",header:"排序规则",visible:false},
    { field:"table_comment",header:"备注",visible:true}
  ]

  // 左边表格的列 - 显示数据库所有表 - 用户选择性显示的列
  displayedColsTable:ColModel[] = [];

  colsField:ColModel[] = [
    { field:"autoSeq",header:"主键",visible:false},
    { field:"table_name",header:"表名",visible:false},
    { field:"column_name",header:"字段",visible:true},
    { field:"ordinal_position",header:"字段位序",visible:false},
    { field:"column_default",header:"默认值",visible:false},
    { field:"data_type",header:"数据类型",visible:true},
    { field:"column_comment",header:"备注",visible:true}
  ]

  displayedColsField:ColModel[] = [];

  tableData:MySQLTable[] = [];
  selectedRow:MySQLTable;

  tableDataField:MySQLTableCols[] = [];
  selectedRowField:MySQLTableCols;

  constructor(
    private service:MysqlSysObjService,
    private msgService:MessageService,
    private datePipe:DatePipe
  ) { 
    this.displayedColsTable = this.cols.filter(( res:ColModel ) => {
      return res.visible === true;
    });// 初始化左边表格显示所有列

    this.displayedColsField = this.colsField.filter((res) =>{
      return res.visible === true;
    });

    this.service.getTables("femis").subscribe(
      ( res:MySQLTable[] ) =>{
        this.tableData = res;
        this.msgService.add({ severity:"info",summary:"通知",detail:"获取到所有表数据！"});
      },error => console.log("获取所有表时出错！")
    );

    
  }

  ngOnInit() {
  }


  getCols(){
    this.msgService.add({ severity:'info',summary:'通知',detail:'选中了一行' });

    if(this.selectedRow === undefined) return;
    if(this.selectedRow === null) return;
    const tableName:string = this.selectedRow.table_name;
    if(tableName.length <=0 ) return;


    var schema:MySQLSchema = new MySQLSchema();
    schema.table_schema = "femis";
    schema.table_name = tableName;

    this.service.getCols(schema).subscribe(
      ( res:MySQLTableCols[] ) => {
        this.tableDataField = res;
      },error => this.msgService.add({ severity:"info",summary:"通知",detail:"获取表字段失败！" })
    );

  }



  // 生成 Model
  generateModel(event){
    

    if(this.tableDataField === undefined || this.tableDataField.length <=0){
      return
    }

    var modelString:string="";
    var dataType:string = "";
    var datetime:string = this.datePipe.transform(new Date(),"yyyy-MM-dd HH:mm:ss");
    modelString = `   
export class ${this.tableDataField[0].table_name}{
      constructor(){
        this._change = false;
      }  

      resetChange(){
        this._change = false;
      }
    `
    this.tableDataField.forEach(ele => {
      dataType = this.service.dataTypeMap[ele["data_type"]];
      modelString = modelString + `
      private _${ele["column_name"]}:${dataType};
      `
    })
    modelString = modelString + `
      private _change:boolean;
    `

    this.tableDataField.forEach(ele => {
      dataType = this.service.dataTypeMap[ele["data_type"]];
      modelString = modelString + `
      get ${ele["column_name"]}():${dataType}{
        return ${ele["column_name"]};
      }
      set ${ele["column_name"]}(value:${dataType}){
        this._${ele["column_name"]} = value;
        this._change = true;
      }
      `
    });

    modelString = modelString + `
  }`

    console.log(modelString);
  }

}

export class ColModel{
  field:string;
  header:string;
  visible:boolean;
}
