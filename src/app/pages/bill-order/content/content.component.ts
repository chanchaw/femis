import { OrderDetail, OrderDetailService, OrderDetailProto } from './../../../shared/services/order-detail.service';
import { Packmanner,PackmannerService } from './../../../shared/services/packmanner.service';
import { Settlement, SettlementService } from './../../../shared/services/settlement.service';
import { SalecategoryService, SaleCategory } from './../../../shared/services/salecategory.service';
import { CompanytitleService, CompanyTitle } from './../../../shared/services/companytitle.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactCompanyService, ContactCompany } from 'src/app/shared/services/contact-company.service';
import { DeliverytypeService, DeliveryType } from 'src/app/shared/services/deliverytype.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { OrderMainService, ResponseResult, OrderMain, SingleString } from 'src/app/shared/services';
import { MessageService } from 'primeng/api';
import { BillOrderService, BillOrderProto, BillOrder } from 'src/app/shared/services/bill-order.service';
import { DatePipe } from '@angular/common';
import { ContinuousService } from 'src/app/shared/services/continuous.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import * as gConst from 'src/app/shared/services/globalConst';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  providers:[ DatePipe ]
})
export class ContentComponent implements OnInit {

  //#region 属性
  mainForm: FormGroup;
  billStatus:number;
  dddContactCompany:ContactCompany[] = [];
  dddCompanyTitle:CompanyTitle[] = [];
  dddSaleCategory:SaleCategory[] = [];
  // dddSettlement:Settlement[] = [];
  dddSettlement:string[] = [];
  optSettlement:string[] = [];
  inputSettlement:string;

  dddDeliveryType:string[] = [];
  optDeliveryType:string[] = [];
  inputDeliveryType:string;

  dddPackmanner:string[] = [];
  optPackmanner:string[] = [];
  inputPackmanner:string;

  
  tableData:OrderDetail[] = [];

  /**
   * 1. 遍历 tableData 过滤掉非法数据将有效数据构成新的数据
   * 2. 将该数据赋值单据对象实例，异步请求发送给后端
   */
  td2Save:OrderDetail[] = [];

  cols:PTableHeader[] =[
    { field:"ordercode",header:"订单号"},
    { field:"oordercode",header:"源订单号"},
    { field:"stylecode",header:"款号"},
    { field:"goodsname",header:"品名"},


    { field:"spec01",header:"门幅"},
    { field:"spec02",header:"克重"},
    { field:"color",header:"颜色示例"},
    { field:"colorcode",header:"色号"},
    { field:"colorname",header:"颜色"},
    { field:"kg",header:"公斤"},
    { field:"meter",header:"米数"},
    { field:"yard",header:"码数"},
    { field:"price",header:"单价"},
    { field:"amount",header:"金额"},
    { field:"chargeunit",header:"计价单位"},
    { field:"platemake",header:"制版费"},
    { field:"sample",header:"中样费"}
  ]

  selectedRow:OrderDetail;
  selectedRowIndex:number;
  displayedCols:PTableHeader[] = [];

  tmpMain:OrderMain = new OrderMain();
  //#endregion

  //#region 生命周期钩子
  constructor(
    private fb:FormBuilder,
    private comService:ContactCompanyService,
    private comtService:CompanytitleService,
    private saleCateService:SalecategoryService,
    private SettlementService:SettlementService,
    private deliService:DeliverytypeService,
    private packService:PackmannerService,
    private notiService:NzNotificationService,
    private mainService:OrderMainService,
    private detailService:OrderDetailService,
    private msgService:MessageService, // PrimeNG 的 Toast
    private billService:BillOrderService,
    private datePipe:DatePipe,
    private billcodeService:ContinuousService
  ) { 
    this.displayedCols = [];
    this.displayedCols = this.displayedCols.concat(this.cols);
  }

  ngOnInit() {
    this.createBlankBill();// 创建新的空白的单据
  }
  //#endregion

  //#region 初始化表单
  initForm(){
    let billdate = new Date();// 单据日期默认当天
    let deliverytime = new Date();
    deliverytime.setMilliseconds(new Date().getMilliseconds() + 1000 * 60 * 60 * 24 * 7);//交期为当天推迟7天

    const d1:string = this.datePipe.transform(billdate,"yyyy-MM-dd HH:mm:ss");
    const d2:string = this.datePipe.transform(deliverytime,"yyyy-MM-dd HH:mm:ss");
    this.mainForm = this.fb.group({
      id:[null],
      codeid: [null],
      billdate: [d1, [Validators.required]],
      deliverytime:[d2,[Validators.required]],
      clientid:[null,[Validators.required]],
      pactcode:[null,[Validators.required]],
      contractor:[null,[Validators.required]],
      salecategory:[null,[Validators.required]],
      settlement:[null],deliverytype:[null],packmanner:[null],remark:[null],

      // 下面是不反应到 UI 上的属性
      status:[1]
    });

    // 初始化表单状态属性
    this.billStatus = 0;
  }

  // 构建空的表格数据源，新增空白单据时用到
  createEmptyTable(){
    this.tableData = [];
    for(let i=0;i<5;i++){
      this.tableData.push(new OrderDetail());
    }

  }

  // 创建空白的新单据
  createBlankBill(){
    this.initForm();
    this.initDropdownData();
    this.createEmptyTable();
  }

  //#endregion

  //#region 初始化表单中下拉组件的数据源
  initDropdownData(){
    this.comService.getAll().subscribe(
      (val:ContactCompany[]) =>{
        this.dddContactCompany = val;
      },error => console.log("获取往来单位时出错！")
    );

    this.comtService.getAll().subscribe(
      (val:CompanyTitle[]) => {
        this.dddCompanyTitle = val;
      },error => console.log("获取接单抬头时出错！")
    );

    this.saleCateService.getAll().subscribe(
      (val:SaleCategory[]) => {
        this.dddSaleCategory = val;
      },error => console.log("在获取接单抬头时出错！")
    );


    this.SettlementService.getAll().subscribe(
      (val:Settlement[]) =>{
        this.optSettlement = [];
        this.dddSettlement = [];
        val.forEach(ele => {
          this.optSettlement.push(ele.sid);
          this.dddSettlement.push(ele.sid);
        });
      },error => console.log("在获取结算方式时出错！")
    );

    this.deliService.getAll().subscribe(
      (val:DeliveryType[]) =>{
        this.dddDeliveryType = [];
        this.optDeliveryType = [];

        val.forEach(ele => {
          this.dddDeliveryType.push(ele.sid);
          this.optDeliveryType.push(ele.sid);
        });
      },error=> console.log("在获取交货方式时出错！")
    );


    this.packService.getAll().subscribe(
      (val:Packmanner[]) =>{
        this.dddPackmanner = [];
        this.optPackmanner = [];

        val.forEach(ele => {
          this.dddPackmanner.push(ele.sid);
          this.optPackmanner.push(ele.sid);
        });
      },error=> console.log("在获取包装方式时出错！")
    );

  }
  //#endregion



  // 新增单据
  addNewBill(event){
    this.initForm();// 初始化表单
    this.createEmptyTable();// 初始化表格数据
  }

  // 初始化表格数据
  initTableData(){
    this.tableData = [];
    this.td2Save = [];
  }

  //#region 表单中组件的事件
  onChangeSettlment(value:string){
    if (!value || value.indexOf('@') >= 0) {
      this.optSettlement = [];
    } else {
      this.optSettlement = this.dddSettlement.filter(
        item => {
          return item.indexOf(this.mainForm.value["settlement"])>=0;
        }
      );
    }
  }


  onChangeDeliverytype(value:string){
    if (!value || value.indexOf('@') >= 0) {
      this.optDeliveryType = [];
    } else {
      this.optDeliveryType = this.dddDeliveryType.filter(
        item => {
          return item.indexOf(this.mainForm.value["deliverytype"])>=0;
        }
      );
    }
  }


  onChangePackmanner(value:string){
    if (!value || value.indexOf('@') >= 0) {
      this.optPackmanner = [];
    } else {
      this.optPackmanner = this.dddPackmanner.filter(
        item => {
          return item.indexOf(this.mainForm.value["packmanner"])>=0;
        }
      );
    }
  }
  //#endregion

  //#region 根据外键获取表格数据
  getTableData(fid:number){
    this.detailService.getByMainId(fid).subscribe(
        (val:OrderDetail[]) =>{
            this.tableData = val;
        },error => console.log("获取表格数据出错！")
    );
  }
  //#endregion




  // 新增行
  addNewRow(event){
    let newRow = new OrderDetail();
    this.tableData.splice(this.tableData.length,0,newRow);

  }

  // 鼠标左键单击某CELL立即设置当前行号到全局属性
  setSelectedRowIndex(rowIndex:number){
    this.selectedRowIndex = rowIndex;
    // this.msgService.add({severity:'info', summary:'通知', detail:'选中的行号：' + (this.selectedRowIndex+1).toString()});
  }

  deleteRow(){
    if(this.selectedRowIndex === undefined) {
        this.msgService.add({severity:'warn', summary:'操作错误', detail:'选中表格行后再进行本操作！'});
        return;
    }

    let rowIndex:number = this.selectedRowIndex;
    const id = this.tableData[rowIndex].id;
    this.msgService.add({severity:"info",summary:"通知",detail:"rowIndex=" + rowIndex});
    // 删除UI绑定的数组内的数据
    this.tableData.splice(rowIndex,1);
    

    // 删除服务器上数据
    if (id !== undefined) {
      this.detailService.deleteByPrimaryKey(id).subscribe(
        (val:number) => console.log("删除的返回结果是：" + val.toString()),
        error => console.log("删除时出错！")
      );
    }

    this.selectedRowIndex = undefined;
  }

  // 根据列头是否显示控制数据列的显示
  td2Display(field:string){
    return this.displayedCols.some(
      (item,index,array) =>{
        return array[index].field === field;
      }
    )
  }



// 只进行表单的验证，主表和明细表一起保存
validateMainform():boolean {
  for (const i in this.mainForm.controls) {
    this.mainForm.controls[i].markAsDirty();
    this.mainForm.controls[i].updateValueAndValidity();
  }

  if(this.mainForm.valid === false){
    this.msgService.add({severity:"warn",summary:"操作错误",detail:"红色边框处为必填项！"});
    return false;
  }

  return true;
}


// 检验明细数据，至少有一条同时拥有：订单号、数量（公斤、米数、码数）
validateDetails():boolean{
  
  if(this.tableData.length <= 0 ) {
    this.msgService.add({severity:"warn",summary:"操作错误",detail:"没有明细数据!"});
    return false;
  }

  // 验证每一行数据同时将有效数据重新构成一个数组
  // 将该有效数据构成的数组发送请求给后端，而不是 tableData
  this.td2Save = [];
  for(let i=0;i<this.tableData.length;i++){
    if( this.isDetailValid(this.tableData[i]) ){
      this.td2Save.push(this.tableData[i]);
    }
  }
  if( this.td2Save.length>0 ) return true;


  this.msgService.add({severity:"warn",summary:"操作错误",detail:"明细数据中没有有效数据!"});
  return false;
}



/**
 * 1. 验证主表表单，非法则不保存
 * 2. 验证明细数据数组，非法则不保存
 * 3. 封装为单据对象后异步请求交给后端保存数据
 *    其要先检测单据编号后在执行保存
 * 4. 保存成功则返回新的单据对象，失败会有消息提示
 */
saveBill(){
  if ( !this.validateMainform() ) return;// 验证表单是否可以保存
  if ( !this.validateDetails() ) return;// 验证明细数据是否可以保存


  // this.msgService.add({severity:"info",summary:"通知",detail:"通过了表单验证！"});

  // 1. 构建单据对象等待保存
  let record:BillOrderProto = new BillOrderProto();
  record.main = {...this.mainForm.value};
  // record.details = this.td2Save;

  let protoes:OrderDetailProto[] = [];
  
  this.transformDate4Main(record.main);
  this.td2Save.forEach(ele => {// 这里的 td2Save 不是 OrderDetail 的原型
    this.transformDate4Detail(ele);
    protoes.push(ele.data);
  });
  record.details = protoes;

  // 之前版本要有两次异步请求（第一次请求获取单据编号）
  // 此后只有一个发送单据对象的请求，单据编号的问题交给后端解决
  this.billService.save(record).subscribe(
    ( res:ResponseResult ) =>{
      if( !res.success ){
        this.msgService.add({ severity:"error",summary:"保存失败",detail:res.msg });
      }else{
        this.msgService.add({ severity:"success",summary:"成功",detail:"保存完毕" });

        const bill:BillOrder = res.data;
        this.transformDate(bill);

        this.mainForm.patchValue({...bill.main});
        this.tableData = bill.details;
        this.td2Save = [];
        this.billStatus = bill.main.status;
      }
    }
  );
}


/**
 * 1. 用户手动输入了单据编号，则向后端发送请求验证该单据编号是否存在
 *  1.1. 单据编号存在则返回带有 false 的对象，调用者需要首先验证该标志，如果是 false 不可保存单据
 *  1.2. 单就编号不存在则以用户手动输入的作为新的单据编号
 * 2. 单据编号处没有录入则向后端发送请求按照系统规则获取最新的单据编号
 * 3. 返回一个可观察对象，其数据类型是：{ success:boolean,ob:Observable<SingleString> }
 *    调用者首先验证 success ，如果是 false 则不可继续保存数据
 *    如果是 true，则使用 data:string 作为单据编号
 */
getCodeid():Observable<{success:boolean,data:string}>{
  let temp:string = this.mainForm.value["codeid"];
  var rtn:Observable<{success:boolean,data:string}>;

  
  if(temp.length>0){// 手动输入了单据编号，要检测该单据编号是否已经存在
    this.billcodeService.isFabricBillcodeExists(temp).pipe(
      map((res:boolean) => {
        if( res === true ){// 手动录入的单据编号已经存在，提示用户，并且不可保存单据
          console.log("getCodeid 单据编号已经存在");
          rtn = of({ success:false,data:"" });
        }else{// 手动输入的单据编号不存在，可以保存单据
          console.log("getCodeid 单据编号不存在");
          rtn = of({ success:true,data:temp });
        }
      })
    )
  }else{// 没有手动录入，则通过系统方法获取最新的单据编号
    const ob$ = this.billcodeService.getNewBillCode(gConst.BILLTYPE_FABRICORDER);
    ob$.pipe(map((res:SingleString) => {
      console.log("getCodeid 没有手动录入单据编号");
      rtn = of({ success:true,data:res.data });
    }));
  }

  return rtn;
}

transformDate(val:BillOrder){
  val.main.billdate = this.datePipe.transform(val.main.billdate,"yyyy-MM-dd HH:mm:ss");
  val.main.deliverytime = this.datePipe.transform(val.main.deliverytime,"yyyy-MM-dd HH:mm:ss");

  val.details.forEach(ele => {
    ele.createtime = this.datePipe.transform(ele.createtime,"yyyy-MM-dd HH:mm:ss");
    ele.updatetime = this.datePipe.transform(ele.updatetime,"yyyy-MM-dd HH:mm:ss");
  });
}

transformDate4Detail(row:OrderDetail){  
  row.createtime = this.datePipe.transform(row.createtime,"yyyy-MM-dd HH:mm:ss");
  row.updatetime = this.datePipe.transform(row.updatetime,"yyyy-MM-dd HH:mm:ss");
}

transformDate4Main(main:OrderMain){  
  main.billdate = this.datePipe.transform(main.billdate,"yyyy-MM-dd HH:mm:ss");
  main.deliverytime = this.datePipe.transform(main.deliverytime,"yyyy-MM-dd HH:mm:ss");
}

  // 批量保存明细数据 - 测试用
  saveList(){
    // console.log(this.tableData);
    // this.detailService.saveList(this.tableData).subscribe(
    //   (val:number) => console.log("批量保存后返回值是：" + val.toString()),error => console.log("批量保存时出错！")
    // );
  }

  saveMain(event){
    // this.mainService.save(this.mainForm.value).subscribe(
    //   (val:number) => console.log("保存主表的返回值是：" + val.toString()),error =>console.log("保存主表时出错！")
    // );
  }

  getMain(){
    let obj:OrderMain = new OrderMain();
    this.mainService.getByPrimaryKey(24).subscribe(
      val => {
        this.tmpMain = val;
        console.log(this.tmpMain);
      },error => console.log("获取单据主表时出错！")
    );
  }


  get24(){
    this.billService.getBPK(24).subscribe(
      (val:BillOrder) => {
        console.log(val);
        // val.main.billdate = new Date(val.main.billdate).toLocaleDateString();
        // val.main.deliverytime = new Date(val.main.deliverytime).toLocaleDateString();
        // val.main.billdate = new Date(val.main.billdate);
        // val.main.deliverytime = new Date(val.main.deliverytime);

        this.transformDate(val);

        this.mainForm.patchValue({...val.main});
        this.tableData = val.details;
        this.billStatus = val.main.status;
        
        this.msgService.add({severity:"info",summary:"通知",detail:"成功获取主键=24的单据！"});
      },error => console.log("获取24单据出错！")
    );
  }


  onChangeBilldate(event){

  }

  onChangeDeliverytime(){

  }


  //#region 保存前做数据合法性校验

  // 阻止型 - 检测到非法则弹出 Toast ，并且阻止保存
  prevent():boolean{
    // 单据日期 - 必填项
    if(this.mainForm.value["billdate"] === null || 
        this.mainForm.value["billdate"] === undefined ||
        this.mainForm.valid["billdate"].length <= 0){
      return false;
    }


    // 客户 - 必填项
    return true;
  }

  // 建议型 - 用户选择继续则保存，相反则不保存
  suggest():boolean{
    return true;
  }

  //#endregion



  //#region 工具方法
  // 判断字符串长度大于0为true，反之为false
  isStringValid(val:any):boolean{
    if( val !==undefined && val !==null && val.length >0 )
      return true;
    else
      return false;
  }

  // 数字类型变量的值大于0则返回true
  isNumberValid(val:any):boolean{
    if( val !==undefined && val !==null && val >0 )
      return true;
    else
      return false;
  }


  /**
   * 传入 OrderDetail 对象
   * 检验是否有效：有订单号，有数量
   */
  isDetailValid(val:OrderDetail):boolean{
    if( !this.isStringValid(val.ordercode) ) return false;
    if( !this.isNumberValid(val.kg) && !this.isNumberValid(val.meter) && !this.isNumberValid(val.yard) ) return false;
    return true;
  }

  //#endregion


  // 测试表单是否修改了
  testModify(){
    if(this.mainForm.dirty === true)
      this.msgService.add({ severity:"info",summary:"通知",detail:"修改了" });
    else
    this.msgService.add({ severity:"info",summary:"通知",detail:"没有修改" });
  }

  // 打开一张单据
  openBill( bill:BillOrder ){
    this.transformDate( bill );
    this.mainForm.patchValue({...bill.main});
    this.tableData = bill.details;
    this.td2Save = [];
    this.billStatus = bill.main.status;
  }


  //#region 移动单据
  moveFirst(){
    this.billService.moveFirst().subscribe(
      ( res:ResponseResult ) =>{
        if( !res.success ) {
          this.msgService.add({ severity:"info",summary:"通知",detail:res.msg });
        }else{
          this.openBill( res.data );
        }
      }
    );
  }

  moveLast(){
    this.billService.moveLast().subscribe(
      ( res:ResponseResult ) =>{
        if( !res.success ) {
          this.msgService.add({ severity:"info",summary:"通知",detail:res.msg });
        }else{
          this.openBill( res.data );
        }
      }
    );
  }

  movePrevious(){
    if( !this.mainForm || this.mainForm.value["id"]<=0 ){
      this.moveLast();
      return
    }

    const curBillId:number = this.mainForm.value["id"];

    this.billService.movePrevious(curBillId).subscribe(
      ( res:ResponseResult ) =>{
        if( !res.success ) {
          this.msgService.add({ severity:"info",summary:"通知",detail:res.msg });
        }else{
          this.openBill( res.data );
        }
      }
    );
  }

  moveNext(){
    if( !this.mainForm || this.mainForm.value["id"]<=0 ){
      this.moveLast();
      return
    }

    const curBillId:number = this.mainForm.value["id"];

    this.billService.moveNext(curBillId).subscribe(
      ( res:ResponseResult ) =>{
        if( !res.success ) {
          this.msgService.add({ severity:"info",summary:"通知",detail:res.msg });
        }else{
          this.openBill( res.data );
        }
      }
    );
  }

  //#endregion

  export(){
    
  }

}


export class PTableHeader{
  field:string;header:string
}