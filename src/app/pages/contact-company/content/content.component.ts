import { DxDataGridComponent } from 'devextreme-angular';
import { ContactCategoryService } from './../../../shared/services/contact-category.service';
import { TableStyle } from './../../../shared/services/tablestyle.service';
import { TablestyleService, ContactCategory } from 'src/app/shared/services';
import { DevExtremeDataGridColumn } from './../../../shared/services/model';
import { ContactCompanyService, ContactCompany } from './../../../shared/services/contact-company.service';
import { Component, OnInit } from '@angular/core';
import { TABLESTYLE2DXDATAGRIDCOLUMN } from 'src/app/shared/services/globalConst';
import CustomStore from 'devextreme/data/custom_store';
import { HttpParams, HttpClient } from '@angular/common/http';
import { NzNotificationService } from 'ng-zorro-antd';


class EditCache{
  edit:boolean;
  isNew:boolean;
  data:ContactCompany
}

@Component({
  selector: 'app-content',
  templateUrl: './contentZ.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  //#region 属性
  tableCols:TableStyle[] = [];
  tableName:string = "contactcompany";
  tableData:ContactCompany[] = [];

  editCache: { [key: string]: any } = {};
  
  uuidv5 = require('uuid/v5');
  uuid:string;
  // editCache:EditCache = new EditCache();
  //#endregion

  constructor(
    private tService:TablestyleService,
    private bService:ContactCompanyService,
    private notiService:NzNotificationService
  ){
    // 获取表格样式配置
    this.tService.getSingleTable(this.tableName).subscribe(
      (val:TableStyle[]) => this.tableCols = val,
      error => console.log("在获取表格样式时出错！")
    );

    // 获取数据用于显示
    this.bService.getAll().subscribe(
      (val:ContactCompany[]) => {
        this.tableData = val;
        this.updateEditCache();
      },
      error => console.log("获取往来单位数据时出错！")
    );

    
  }

  ngOnInit(){

  }

  // 开启编辑状态  
  startEdit(sid: string): void {
    this.editCache[sid].edit = true;
  }

  // 取消编辑状态
  cancelEdit(sid: string): void {
    const index = this.tableData.findIndex(item => item.sid === sid);

    //#region 新增的行取消编辑则删除元素
    if(this.editCache[index].isNew === true){
      console.log('本行是新增的行');
      this.tableData = this.tableData.filter(
        item => {
          console.log(item);
          console.log(item.sid!==sid);
          return item.sid !== sid;
        }
      );
    }else{
      console.log('本行不是新增的行');
    }
    //#endregion


    this.editCache[sid] = {
      data: { ...this.tableData[index] },
      edit: false,isNew:false
    };

  }

  // 保存编辑数据
  saveEdit(sid: string): void {
    // if(this.check4Save(id)===false) return;

    if(sid.length<=0) {
      this.notiService.blank("错误","传入的sid为空！");
      return;
    };
    console.log("saveEdit.sid=" + sid);
    const index = this.tableData.findIndex(item => item.sid === sid);
    Object.assign(this.tableData[index], this.editCache[sid].data);
  
    this.editCache[sid].edit = false;
    this.editCache[sid].isNew = false;
    
    this.tableData[index].oprimary = this.tableData[index].sid;
    this.bService.updateByPrimaryKey(this.tableData[index]).subscribe(
      val => console.log(val),error => console.log('更新数据到后端时出错！')      
    );
  }

  // 更新编辑用缓存数据
  updateEditCache(): void {
    this.tableData.forEach(item => {
      this.editCache[item.sid] = {
        edit: false,
        isNew: false,
        data: { ...item }
      };
    });
  }

  // 删除行
  deleteRow(sid:string){
    this.tableData = this.tableData.filter(
      item => {
        return item.sid !== sid;
      }
    )
  }


  addNewRow(){
    var newIndex:number = this.tableData.length;
    // var newItem = { sid:'',name:'',code:'',categories:'',status:1};
    var newItem = new ContactCompany();
    newItem.sid = "";
    // newItem.edit = true;
    // newItem.isNew = true;
    // newItem.data = new ContactCompany();
    // newItem.data.sid="";

    console.log('进入了新增方法内' + this.tableData.length);

    this.tableData = this.tableData.concat(newItem);
    console.log(this.tableData);
    this.editCache[newItem.sid] = {
      edit: true,
      isNew: true,
      data: { ...this.tableData[newIndex] }
    };
    // this.editCache[newIndex] = newItem;
    console.log(this.editCache);
    console.log(this.editCache[newIndex]);
    console.log(this.tableData);
  }


  getUUID(){
    this.uuid=this.uuidv5("chanchaw", "1b671a64-40d5-491e-99b0-da01ff1f3341");
  }

}
