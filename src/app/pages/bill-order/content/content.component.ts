import { Packmanner,PackmannerService } from './../../../shared/services/packmanner.service';
import { Settlement, SettlementService } from './../../../shared/services/settlement.service';
import { SalecategoryService, SaleCategory } from './../../../shared/services/salecategory.service';
import { CompanytitleService, CompanyTitle } from './../../../shared/services/companytitle.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactCompanyService, ContactCompany } from 'src/app/shared/services/contact-company.service';
import { DeliverytypeService, DeliveryType } from 'src/app/shared/services/deliverytype.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { OrderMainService } from 'src/app/shared/services';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  //#region 属性
  mainForm: FormGroup;
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
    private mainService:OrderMainService
  ) { }

  ngOnInit() {
    this.initForm();// 初始化表单
    this.initDropdownData();
  }
  //#endregion

  //#region 初始化表单
  initForm(){
    let billdate = new Date();// 单据日期默认当天
    let deliverytime = new Date();
    deliverytime.setMilliseconds(new Date().getMilliseconds() + 1000 * 60 * 60 * 24 * 7);//交期为当天推迟7天

    this.mainForm = this.fb.group({
      id:[null],
      codeid: [null],
      billdate: [billdate, [Validators.required]],
      deliverytime:[deliverytime,[Validators.required]],
      clientid:[null,[Validators.required]],
      pactcode:[null,[Validators.required]],
      contractor:[null,[Validators.required]],
      salecategory:[null,[Validators.required]],
      settlement:[null],
      deliverytype:[null],
      packmanner:[null],
      remark:[null]
    });

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

  //#region 提交表单
  submitMainform(): void {
    for (const i in this.mainForm.controls) {
      this.mainForm.controls[i].markAsDirty();
      this.mainForm.controls[i].updateValueAndValidity();
    }

    if(this.mainForm.valid === false){
      this.notiService.blank("保存失败","显示红色的要素是必填项！");
      return;
    }

    this.mainService.save(this.mainForm.value).subscribe(
      (val:boolean) => {
        console.log("插入数据" + val);
      },error => console.log("保存主表数据时出错！")
    );
  }
  //#endregion

  //#region UI组件事件
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


}
