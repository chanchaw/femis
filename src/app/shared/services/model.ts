import { Injectable } from '@angular/core';

/**
 * 这里只涉及公共的 model ，和业务相关的 model 都嵌入在 service 中
 */
@Injectable()
export class JsonData{
    public success:boolean;
    public msg:string;
    public data:any[];
}

@Injectable()
/**
 * 创建时间：2019年8月5日 23:42:54
 * 作者：chanchaw
 * 功能简介：后端返回数据的统一接口
 */
export class ResponseResult{
    public success:boolean;
    public code:string;
    public msg:string;
    public data:any;
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


@Injectable()
export class SingleString{
  data:string;
}

