import { DxDataGridComponent } from 'devextreme-angular';
import { ContactCategoryService } from './../../../shared/services/contact-category.service';
import { TableStyle } from './../../../shared/services/tablestyle.service';
import { TablestyleService, ContactCategory } from 'src/app/shared/services';
import { DevExtremeDataGridColumn, SingleString } from './../../../shared/services/model';
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
  templateUrl: './content01.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  //#region 属性
  tableCols:TableStyle[] = [];
  tableName:string = "contactcompany";
  tableData:ContactCompany[] = [];

  editCache: { [key: string]: any } = {};
  searchValue:string;
  categories:ContactCategory[] = [];
  mSelectCategories:string;
  
  // editCache:EditCache = new EditCache();
  //#endregion

  constructor(
    private tService:TablestyleService,
    private bService:ContactCompanyService,
    private notiService:NzNotificationService,
    private cateService:ContactCategoryService
  ){
    // 获取表格样式配置
    this.tService.getSingleTable(this.tableName).subscribe(
      (val:TableStyle[]) => this.tableCols = val,
      error => console.log("在获取表格样式时出错！")
    );

    // 获取数据用于显示
    // this.bService.getAll().subscribe(
    //   (val:ContactCompany[]) => {
    //     this.tableData = val;
    //     this.updateEditCache();
    //   },
    //   error => console.log("获取往来单位数据时出错！")
    // );
    this.getTableData();

    cateService.getAll().subscribe(
      (val:ContactCategory[]) => {
        this.categories = val;
        console.log(this.categories);
      },error => console.log("获取往来单位分类时出错！")
    );
    
  }

  ngOnInit(){

  }

  // 开启编辑状态  
  startEdit(index: number): void {
    this.editCache[index].edit = true;
  }

  // 取消编辑状态
  cancelEdit(index: number): void {
    // const index = this.tableData.findIndex(item => item.sid === index);

    //#region 新增的行取消编辑则删除元素
    if(this.editCache[index].isNew === true){
      this.tableData = this.tableData.splice(index + 1 ,1);
    }else{
      console.log('本行不是新增的行');
    }
    //#endregion


    this.editCache[index] = {
      data: { ...this.tableData[index] },
      edit: false,
      isNew:false
    };

  }

  // 保存编辑数据
  saveEdit(index: number): void {
    // if(this.check4Save(id)===false) return;

    let sid = this.editCache[index].data.sid;
    if(sid.length<=0) {
      this.notiService.blank("错误","传入的sid为空！");
      return;
    };

    this.saveRecord(index);

    // Object.assign(this.tableData[index], this.editCache[index].data);
  
    // this.editCache[index].edit = false;
    // this.editCache[index].isNew = false;
    
    // this.tableData[index].oprimary = this.tableData[index].sid;
    // this.bService.updateByPrimaryKey(this.tableData[index]).subscribe(
    //   val => console.log(val),error => console.log('更新数据到后端时出错！')      
    // );

    
  }


  /**
   * 将编辑的数据保存得到数据库：新增、修改
   * @param index 属性 tableData 数组的 index ,同时也是 editCache 的主键
   */
  saveRecord(index:number){
    let categoryString = this.mSelectCategories.toString();
    this.editCache[index].data.categories = categoryString;
    this.cateService.getCategoryNames(categoryString).subscribe(
      (val:SingleString) => {
        console.log("异步获取分类名称是：" + val.data);
        console.log(val);
        this.editCache[index].data.categoryNames = val.data;
        Object.assign(this.tableData[index], this.editCache[index].data);
        console.log(this.tableData[index]);
        if (this.editCache[index].isNew === true){
          this.addRecord(index);
        }else{
          this.modifyRecord(index);
        }
    
        this.editCache[index].edit = false;
        this.editCache[index].isNew = false;

      },
      (err:Error) => {
        console.log("获取分类名称时出错！");
        console.log(err);
      }
    );

  }

  // 修改DB端数据
  modifyRecord(index:number){
    this.tableData[index].oprimary = this.tableData[index].sid;
    this.bService.updateByPrimaryKey(this.tableData[index]).subscribe(
      val => console.log(),error => console.log("修改DB数据数据时出错！")
    );
  }

  // 向DB端新增一行记录
  addRecord(index:number){
    console.log("addRecord");
    console.log(this.tableData[index]);
    this.bService.insert(this.tableData[index]).subscribe(
      val => console.log("新增了" + val.toString() + "行数据！"),error => console.log("向DB中新增记录时出错！")
    );
  }

  // 更新编辑用缓存数据
  updateEditCache(): void {
    this.editCache = {};
    for (let index = 0; index < this.tableData.length; index++) {
      this.editCache[index] = {
        edit:false,
        isNew:false,
        data:{...this.tableData[index]}
      }
    }
  }

  // 删除行
  deleteRow(index:number){
    let sid = this.tableData[index].sid;

    this.bService.deleteByPrimaryKey(sid).subscribe(
      val => console.log("删除了" + val.toString() + "行数据"),error => console.log("删除数据时出错！")
    );
 
    this.tableData = this.tableData.filter(item => item.sid !== sid);
  }


  addNewRow(){
    var newIndex:number = this.tableData.length;
    // var newItem = { sid:'',name:'',code:'',categories:'',status:1};
    var newItem = new ContactCompany();
    newItem.sid = "AAA";
    // newItem.edit = true;
    // newItem.isNew = true;
    // newItem.data = new ContactCompany();
    // newItem.data.sid="";

    console.log('进入了新增方法内' + this.tableData.length);

    this.tableData = this.tableData.concat(newItem);
    console.log(this.tableData);
    this.editCache[newIndex] = {
      edit: true,
      isNew: true,
      data: { ...this.tableData[newIndex] }
    };
    // this.editCache[newIndex] = newItem;
    console.log(this.editCache);
    console.log(this.editCache[newIndex]);
    console.log(this.tableData);
  }

  refresh(event){
    this.getTableData();
  }

  getTableData(){
    this.bService.getAll().subscribe(
      (val:ContactCompany[]) => {
        this.tableData = val;
        this.updateEditCache();
      },
      error => console.log("获取往来单位数据时出错！")
    );
  }

  search(event){
    if(this.searchValue.length<=0){
      this.getTableData();
    }else{
      this.tableData = this.tableData.filter(
        item =>{
          
          var curBoolean:boolean = false;
  
          for(var a of this.tableCols){
            console.log(a.fieldname + "=" + item[a.fieldname]);
            curBoolean = String(item[a.fieldname]).indexOf(this.searchValue)>=0;
            if (curBoolean === true) {
              console.log(curBoolean);
              break;
            }
          }
  
          return curBoolean;
        }
      );
    }
   

  }

}
