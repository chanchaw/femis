import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderMain } from './order-main.service';
import { OrderDetail, OrderDetailProto } from './order-detail.service';
import { Observable } from 'rxjs';
import { ResponseResult } from './model';


const contextPath:string = 'http://localhost:8080/femisnsb';
const pre:string="/billOrder";


@Injectable({
  providedIn: 'root'
})
export class BillOrderService {


  url = {
    save:contextPath + pre + "/save",
    getBPK:contextPath + pre + "/getByPrimaryKey",
    deleteBPK:contextPath + pre + "/delete",
    moveFirst:contextPath + pre + "/moveFirst",
    movePrevious:contextPath + pre + "/movePrevious",
    moveNext:contextPath + pre + "/moveNext",
    moveLast:contextPath + pre + "/moveLast"
  }
  constructor(
    private http:HttpClient
  ) { }

  /**
   * 在 2019年8月3日 16:34:07 之前传入参数的类型是 BillOrder
   * 由于之后在模型 BillOrder 里面追加了 data:BillOrderProto 属性
   * 导致组件代码中调用时提示类型不对，这里干脆不显示的给出类型，直接发后端即可
   * @param record 单据对象类型
   */
  save(record):Observable<ResponseResult>{
    return this.http.post<ResponseResult>(this.url.save,record);
  }

  getBPK(mainId:number):Observable<BillOrder>{
    const url = this.url.getBPK + '/' + mainId.toString();
    return this.http.get<BillOrder>(url);
  }

  deleteBPK(mainId:number):Observable<boolean>{
    const url = this.url.deleteBPK + '/' + mainId.toString();
    return this.http.get<boolean>(url);
  }

  moveFirst():Observable< ResponseResult >{
    return this.http.get< ResponseResult >( this.url.moveFirst );
  }

  moveLast():Observable< ResponseResult >{
    return this.http.get< ResponseResult >( this.url.moveLast );
  }

  movePrevious( curBillId:number ):Observable< ResponseResult >{
    const url = this.url.movePrevious + "/" + curBillId;
    return this.http.get< ResponseResult >( url );
  }

  moveNext( curBillId:number ):Observable< ResponseResult >{
    const url = this.url.moveNext + "/" + curBillId;
    return this.http.get< ResponseResult >( url );
  }
}



export class BillOrder{
  main:OrderMain;
  details:OrderDetail[];
}

export class BillOrderProto{
  main:OrderMain;
  details:OrderDetailProto[];
}