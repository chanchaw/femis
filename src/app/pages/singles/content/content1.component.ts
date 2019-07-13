import { CczTagComponent } from './../../../shared/components/ccz-tag/ccz-tag.component';
import { DeliverytypeService } from './../../../shared/services/deliverytype.service';
import { HttpClient } from '@angular/common/http';
import { Settlement, SettlementService } from './../../../shared/services/settlement.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DeliveryType } from 'src/app/shared/services/deliverytype.service';

/**
 * 在 2019年7月10日 10:33:16 注释掉
 * 本组件使用 tag 实现展示，但由于删除的预判性问题而弃用
 */
@Component({
  selector: 'app-content1',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  settlement:string[] = [];
  deliveryType:string[] = [];

  @ViewChild("tagSettlement",{static:false})
  tagSettlement:CczTagComponent;

  @ViewChild("tagDelivery",{static:false})
  tagDelivery:CczTagComponent;
  
  
  constructor(
    private http:HttpClient,
    private settlementService:SettlementService,
    private deliverService:DeliverytypeService
  ) { 
    this.getData();

    setTimeout(() => {
      this.refreshTags();
    }, 300);
  }

  ngOnInit() {
  }

  /**
   * 获取所有数据
   */
  getData(){
    this.settlementService.getAll().subscribe(//获取结算方式
      (val:Settlement[]) =>{
        this.settlement=[];
        val.forEach(ele => {
          this.settlement.push(ele.sid);
        });

        console.log(this.settlement);
      },error => console.log("获取结算方式时出错！")
    );

    this.deliverService.getAll().subscribe(//获取交货方式
      (val:DeliveryType[]) => {
        this.deliveryType=[];
        val.forEach(ele => {
          this.deliveryType.push(ele.sid);
        });

        console.log(this.deliveryType);
      },error => console.log("在获取交货方式时出错！")
    );


  }

  //#region 交货方式 CRUD
  deliveryAddNew(event){
    console.log("deliveryAddNew");
    console.log(event);
  }

  deliveryDelete(event){
    console.log("deliveryDelete");
    console.log(event);
  }

  deliveryUpdate(event){
    console.log("deliveryUpdate");
    console.log(event);
  }

  //#endregion

  //#region 结算方式 CRUD
  settlementAddNew(event){
    console.log("settlementAddNew");
    console.log(event);
  }

  settlementDelete(event){
    console.log("settlementDelete");
    console.log(event);
  }

  settlementUpdate(){
    console.log("settlementUpdate");
    console.log(event);
  }

  //#endregion


  refreshTags(){
    this.tagDelivery.initTags();
    this.tagSettlement.initTags();
  }

  //#region 官方 DEMO
  tags:string[] = ['兰尼斯特','史塔克','拜拉席恩','坦格利安'];
  inputVisible = false;
  inputValue = '';
  @ViewChild('inputElement', { static: false }) inputElement: ElementRef;
  
  handleClose(removedTag: {}): void {
    this.tags = this.tags.filter(tag => tag !== removedTag);
  }

  sliceTagName(tag: string): string {
    const isLongTag = tag.length > 20;
    return isLongTag ? `${tag.slice(0, 20)}...` : tag;
  }

  showInput(): void {
    this.inputVisible = true;
    setTimeout(() => {
      this.inputElement.nativeElement.focus();
    }, 10);
  }

  handleInputConfirm(): void {
    if (this.inputValue && this.tags.indexOf(this.inputValue) === -1) {
      this.tags = [...this.tags, this.inputValue];
    }
    this.inputValue = '';
    this.inputVisible = false;
  }

  onCloseTag(event){
    return;
  }
  //#endregion

}
