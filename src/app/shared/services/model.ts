import { Injectable } from '@angular/core';

/**
 * 这里只涉及公共的 model ，和业务相关的 model 都嵌入在 service 中
 */

@Injectable()
export class ValidateResult{//验证后的结果
  public success:boolean;
  public explain:string;
  public statusDesc:string;

  constructor(bool:boolean=true,explain:string=""){
    this.setSuccess(bool);
    this.explain=explain;
  }

  public setSuccess(success:boolean){
    this.success = success;
    if(success===true){
        this.statusDesc='success';
        this.explain='';
    }else{
        this.statusDesc='error'
    }
  }
}


@Injectable()
export class JsonData{
    public success:boolean;
    public msg:string;
    public data:any[];
}


// DevExtreme DataGrid 组件
@Injectable()
export class DevExtremeDataGridColumn{
  dataField:string;
  caption:string;
  width:number;
  fixed:boolean;
  dataType:string;
  alignment:string;
  visible:boolean;
}


// 字段映射
@Injectable()
export class MetaFieldMap{
  oFieldName:string;
  tFieldName:string;
}


