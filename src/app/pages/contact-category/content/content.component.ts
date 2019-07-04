import { DevExtremeDataGridColumn } from './../../../shared/services/model';
import { Component, OnInit, enableProdMode, ElementRef, ViewChild } from '@angular/core';
import { ContactCategoryService, ContactCategory, TablestyleService, TableStyle } from 'src/app/shared/services';
import { TABLESTYLE2DXDATAGRIDCOLUMN } from 'src/app/shared/services/globalConst';
import { DxDataGridComponent } from 'devextreme-angular';

if(!/localhost/.test(document.location.host)) {
  enableProdMode();
}

@Component({
  selector: 'app-content',
  templateUrl: './content02.component.html',
  styleUrls: ['./content01.component.scss']
})
export class ContentComponent implements OnInit {

  tableData:ContactCategory[] = [];
  cols:DevExtremeDataGridColumn[] = [];
  allMode:string = "allPages";
  checkBoxesMode:string = "always";

  @ViewChild("dxTable",{static:false})
  dxTable:ElementRef<DxDataGridComponent>

  selectedRowKeys:any[] = [];


  constructor(
    private service:ContactCategoryService,
    private tableStyleService:TablestyleService
  ) { 
    service.getAll().subscribe(
      (val:ContactCategory[]) => {
        this.tableData = val;

        // for(var i=0;i<val.length;i++){
        //   console.log(this.tableData[i]);
        //   this.tableData[i].rowIndex = i+1;
        // }
        // console.log('补全序号后的数据是：');
        // console.log(this.tableData);
      },
      error => console.log('获取往来单位类型时出错！')
    );

    tableStyleService.getSingleTable("contactcategory").subscribe(
      (val:TableStyle[]) => {// val 是DB端表结构字段构成的，要转换为自定义的 DevExtremeDataGridColumn
        if(val.length>0){
          val.forEach(ele => {
            var item:DevExtremeDataGridColumn = new DevExtremeDataGridColumn();
            TABLESTYLE2DXDATAGRIDCOLUMN.forEach(map => {
              item[map.tFieldName] = ele[map.oFieldName];
            });

            this.cols.push(item);
          });

          console.log(this.cols);
          
        }
      },
      error => console.log('获取表格列样式时出错！')
    );

    

  }

  ngOnInit() {
  }

  onDblClick(rowIndex:any){
    alert('rowIndex = ' + rowIndex);
  }

  onSelect(event){
    console.log(this.selectedRowKeys);
  }
}
