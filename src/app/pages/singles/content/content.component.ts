import { PackageService, Package } from './../../../shared/services/package.service';
import { CompanytitleService, CompanyTitle } from './../../../shared/services/companytitle.service';
import { CczTagComponent } from './../../../shared/components/ccz-tag/ccz-tag.component';
import { DeliverytypeService } from './../../../shared/services/deliverytype.service';
import { HttpClient } from '@angular/common/http';
import { Settlement, SettlementService } from './../../../shared/services/settlement.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DeliveryType } from 'src/app/shared/services/deliverytype.service';
import { NzNotificationService } from 'ng-zorro-antd';




@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

    tableDataSettlement:Settlement[] = [];
    editCacheSettlement: { [key: string]: any } = {};

    tableDataDelivery:Settlement[] = [];
    editCacheDelivery: { [key: string]: any } = {};

    tableDataComTitle:Settlement[] = [];
    editCacheComTitle: { [key: string]: any } = {};

    tableDataPack:Settlement[] = [];
    editCachePack: { [key: string]: any } = {};

    constructor(
        private http:HttpClient,
        private notiService:NzNotificationService,
        private settlementService:SettlementService,
        private deliveryService:DeliverytypeService,
        private comTitleService:CompanytitleService,
        private packService:PackageService
    ) 
    {
        settlementService.getAll().subscribe(
            (val:Settlement[]) => {
                this.tableDataSettlement = val;
                this.updateEditCacheSettlement();
            },
            error => console.log("在获取结算方式时出错！")
        );

        deliveryService.getAll().subscribe(
            (val:DeliveryType[]) =>{
                this.tableDataDelivery = val;
                this.updateEditCacheDelivery();
            },error => console.log("获取交货方式时出错！")
        );

        comTitleService.getAll().subscribe(
            (val:CompanyTitle[]) => {
                this.tableDataComTitle = val;
                this.updateEditCacheComTitle();
            },error => console.log("获取接单抬头时出错！")
        );

        packService.getAll().subscribe(
            (val:Package[]) => {
                this.tableDataPack = val;
                this.updateEditCachePack();
            },error =>console.log("获取包装方式时出错！")
        );
    }

    ngOnInit() {
    }


    //#region 结算方式 CRUD
    // 将表格数据更新到缓存数据
    updateEditCacheSettlement(): void {
        this.editCacheSettlement = {};

        for (let index = 0; index < this.tableDataSettlement.length; index++) {
        this.editCacheSettlement[index] = {
            edit:false,
            isNew:false,
            data:{...this.tableDataSettlement[index]}
        }
        }
    }


    // 开启编辑状态  
    startEditSettlement(index: number): void {
        this.editCacheSettlement[index].edit = true;
    }


    // 取消编辑状态
    cancelEditSettlement(index: number): void {
        //#region 新增的行取消编辑则删除元素
        if(this.editCacheSettlement[index].isNew === true){
            this.tableDataSettlement = this.tableDataSettlement.splice(index + 1 ,1);
        }else{
            console.log('本行不是新增的行');
        }
        //#endregion


        this.editCacheSettlement[index] = {
            data: { ...this.tableDataSettlement[index] },
            edit: false,
            isNew:false
        };
    }


    // 保存编辑数据
    saveEditSettlement(index: number): void {
        let sid = this.editCacheSettlement[index].data.sid;
        if(sid.length<=0) {
            this.notiService.blank("错误","传入的sid为空！");
            return;
        };

        this.saveRecordSettlement(index);
    }



    /**
     * 将编辑的数据保存得到数据库：新增、修改
     * @param index 属性 tableData 数组的 index ,同时也是 editCache 的主键
     */
    saveRecordSettlement(index:number){
        this.editCacheSettlement[index].data.oprimary = this.tableDataSettlement[index].sid;
        Object.assign(this.tableDataSettlement[index], this.editCacheSettlement[index].data);
        if (this.editCacheSettlement[index].isNew === true){
            this.addRecordSettlement(index);// 数据库新增行
        }else{
            this.modifyRecordSettlement(index);//数据库修改行
        }

        this.editCacheSettlement[index].edit = false;
        this.editCacheSettlement[index].isNew = false;
    }

    // 修改DB端数据
    modifyRecordSettlement(index:number){
        this.settlementService.updateBPKS(this.tableDataSettlement[index]).subscribe(
            val => console.log("修改数据完毕！"),error => console.log("修改DB数据数据时出错！")
        );
    }

    // 向DB端新增一行记录
    addRecordSettlement(index:number){
        this.settlementService.insert(this.tableDataSettlement[index]).subscribe(
            val => console.log("新增了" + val.toString() + "行数据！"),
            error => console.log("向DB中新增记录时出错！")
        );
    }

    // 新增行
    addNewRowSettlement(event){
        var newIndex:number = this.tableDataSettlement.length;
        var newItem = new Settlement();
        newItem.sid = "";

        this.tableDataSettlement = this.tableDataSettlement.concat(newItem);
        
        this.editCacheSettlement[newIndex] = {
            edit: true,
            isNew: true,
            data: { ...this.tableDataSettlement[newIndex] }
        };

    }


      // 删除行
    deleteRowSettlement(index:number){
        let sid = this.tableDataSettlement[index].sid;

        this.settlementService.deleteByPrimaryKey(sid).subscribe(
            val => console.log("删除了" + val.toString() + "行数据"),error => console.log("删除数据时出错！")
        );

        this.tableDataSettlement = this.tableDataSettlement.filter(item => item.sid !== sid);
    }

    //#endregion

    //#region 交货方式  CRUD
    // 将表格数据更新到缓存数据
    updateEditCacheDelivery(): void {
        this.editCacheDelivery = {};

        for (let index = 0; index < this.tableDataDelivery.length; index++) {
        this.editCacheDelivery[index] = {
            edit:false,
            isNew:false,
            data:{...this.tableDataDelivery[index]}
        }
        }
    }


    // 开启编辑状态  
    startEditDelivery(index: number): void {
        this.editCacheDelivery[index].edit = true;
    }


    // 取消编辑状态
    cancelEditDelivery(index: number): void {
        //#region 新增的行取消编辑则删除元素
        if(this.editCacheDelivery[index].isNew === true){
            this.tableDataDelivery = this.tableDataDelivery.splice(index + 1 ,1);
        }else{
            console.log('本行不是新增的行');
        }
        //#endregion


        this.editCacheDelivery[index] = {
            data: { ...this.tableDataDelivery[index] },
            edit: false,
            isNew:false
        };
    }


    // 保存编辑数据
    saveEditDelivery(index: number): void {
        let sid = this.editCacheDelivery[index].data.sid;
        if(sid.length<=0) {
            this.notiService.blank("错误","传入的sid为空！");
            return;
        };

        this.saveRecordDelivery(index);
    }



    /**
     * 将编辑的数据保存得到数据库：新增、修改
     * @param index 属性 tableData 数组的 index ,同时也是 editCache 的主键
     */
    saveRecordDelivery(index:number){
        this.editCacheDelivery[index].data.oprimary = this.tableDataDelivery[index].sid;
        Object.assign(this.tableDataDelivery[index], this.editCacheDelivery[index].data);
        if (this.editCacheDelivery[index].isNew === true){
            this.addRecordDelivery(index);// 数据库新增行
        }else{
            this.modifyRecordDelivery(index);//数据库修改行
        }

        this.editCacheDelivery[index].edit = false;
        this.editCacheDelivery[index].isNew = false;
    }

    // 修改DB端数据
    modifyRecordDelivery(index:number){
        this.deliveryService.updateByPrimaryKey(this.tableDataDelivery[index]).subscribe(
            val => console.log("修改数据完毕！"),error => console.log("修改DB数据数据时出错！")
        );
    }

    // 向DB端新增一行记录
    addRecordDelivery(index:number){
        this.deliveryService.insert(this.tableDataDelivery[index]).subscribe(
            val => console.log("新增了" + val.toString() + "行数据！"),
            error => console.log("向DB中新增记录时出错！")
        );
    }

    // 新增行
    addNewRowDelivery(event){
        var newIndex:number = this.tableDataDelivery.length;
        var newItem = new DeliveryType();
        newItem.sid = "";

        this.tableDataDelivery = this.tableDataDelivery.concat(newItem);
        
        this.editCacheDelivery[newIndex] = {
            edit: true,
            isNew: true,
            data: { ...this.tableDataDelivery[newIndex] }
        };

    }


      // 删除行
    deleteRowDelivery(index:number){
        let sid = this.tableDataDelivery[index].sid;

        this.deliveryService.deleteByPrimaryKey(sid).subscribe(
            val => console.log("删除了" + val.toString() + "行数据"),error => console.log("删除数据时出错！")
        );

        this.tableDataDelivery = this.tableDataDelivery.filter(item => item.sid !== sid);
    }

    //#endregion
    
    //#region 接单抬头 CRUD
    // 将表格数据更新到缓存数据
    updateEditCacheComTitle(): void {
        this.editCacheComTitle = {};

        for (let index = 0; index < this.tableDataComTitle.length; index++) {
        this.editCacheComTitle[index] = {
            edit:false,
            isNew:false,
            data:{...this.tableDataComTitle[index]}
        }
        }
    }


    // 开启编辑状态  
    startEditComTitle(index: number): void {
        this.editCacheComTitle[index].edit = true;
    }


    // 取消编辑状态
    cancelEditComTitle(index: number): void {
        //#region 新增的行取消编辑则删除元素
        if(this.editCacheComTitle[index].isNew === true){
            this.tableDataComTitle = this.tableDataComTitle.splice(index + 1 ,1);
        }else{
            console.log('本行不是新增的行');
        }
        //#endregion


        this.editCacheComTitle[index] = {
            data: { ...this.tableDataComTitle[index] },
            edit: false,
            isNew:false
        };
    }


    // 保存编辑数据
    saveEditComTitle(index: number): void {
        let sid = this.editCacheComTitle[index].data.sid;
        if(sid.length<=0) {
            this.notiService.blank("错误","传入的sid为空！");
            return;
        };

        this.saveRecordComTitle(index);
    }



    /**
     * 将编辑的数据保存得到数据库：新增、修改
     * @param index 属性 tableData 数组的 index ,同时也是 editCache 的主键
     */
    saveRecordComTitle(index:number){
        this.editCacheComTitle[index].data.oprimary = this.tableDataComTitle[index].sid;
        Object.assign(this.tableDataComTitle[index], this.editCacheComTitle[index].data);
        if (this.editCacheComTitle[index].isNew === true){
            this.addRecordComTitle(index);// 数据库新增行
        }else{
            this.modifyRecordComTitle(index);//数据库修改行
        }

        this.editCacheComTitle[index].edit = false;
        this.editCacheComTitle[index].isNew = false;
    }

    // 修改DB端数据
    modifyRecordComTitle(index:number){
        console.log(this.tableDataComTitle[index]);
        this.comTitleService.updateBPK(this.tableDataComTitle[index]).subscribe(
            val => console.log("修改数据完毕！"),error => console.log("修改DB数据数据时出错！")
        );
    }

    // 向DB端新增一行记录
    addRecordComTitle(index:number){
        this.comTitleService.insert(this.tableDataComTitle[index]).subscribe(
            val => console.log("新增了" + val.toString() + "行数据！"),
            error => console.log("向DB中新增记录时出错！")
        );
    }

    // 新增行
    addNewRowComTitle(event){
        var newIndex:number = this.tableDataComTitle.length;
        var newItem = new CompanyTitle();
        newItem.sid = "";

        this.tableDataComTitle = this.tableDataComTitle.concat(newItem);
        
        this.editCacheComTitle[newIndex] = {
            edit: true,
            isNew: true,
            data: { ...this.tableDataComTitle[newIndex] }
        };

    }


      // 删除行
    deleteRowComTitle(index:number){
        let sid = this.tableDataComTitle[index].sid;

        this.comTitleService.deleteBPK(sid).subscribe(
            val => console.log("删除了" + val.toString() + "行数据"),error => console.log("删除数据时出错！")
        );

        this.tableDataComTitle = this.tableDataComTitle.filter(item => item.sid !== sid);
    }

    //#endregion



    //#region 包装方式 CRUD
    // 将表格数据更新到缓存数据
    updateEditCachePack(): void {
        this.editCachePack = {};

        for (let index = 0; index < this.tableDataPack.length; index++) {
        this.editCachePack[index] = {
            edit:false,
            isNew:false,
            data:{...this.tableDataPack[index]}
        }
        }
    }


    // 开启编辑状态  
    startEditPack(index: number): void {
        this.editCachePack[index].edit = true;
    }


    // 取消编辑状态
    cancelEditPack(index: number): void {
        //#region 新增的行取消编辑则删除元素
        if(this.editCachePack[index].isNew === true){
            this.tableDataPack = this.tableDataPack.splice(index + 1 ,1);
        }else{
            console.log('本行不是新增的行');
        }
        //#endregion


        this.editCachePack[index] = {
            data: { ...this.tableDataPack[index] },
            edit: false,
            isNew:false
        };
    }


    // 保存编辑数据
    saveEditPack(index: number): void {
        let sid = this.editCachePack[index].data.sid;
        if(sid.length<=0) {
            this.notiService.blank("错误","传入的sid为空！");
            return;
        };

        this.saveRecordPack(index);
    }



    /**
     * 将编辑的数据保存得到数据库：新增、修改
     * @param index 属性 tableData 数组的 index ,同时也是 editCache 的主键
     */
    saveRecordPack(index:number){
        this.editCachePack[index].data.oprimary = this.tableDataPack[index].sid;
        Object.assign(this.tableDataPack[index], this.editCachePack[index].data);
        if (this.editCachePack[index].isNew === true){
            this.addRecordPack(index);// 数据库新增行
        }else{
            this.modifyRecordPack(index);//数据库修改行
        }

        this.editCachePack[index].edit = false;
        this.editCachePack[index].isNew = false;
    }

    // 修改DB端数据
    modifyRecordPack(index:number){
        this.packService.updateBPK(this.tableDataPack[index]).subscribe(
            val => console.log("修改数据完毕！"),error => console.log("修改DB数据数据时出错！")
        );
    }

    // 向DB端新增一行记录
    addRecordPack(index:number){
        this.packService.insert(this.tableDataPack[index]).subscribe(
            val => console.log("新增了" + val.toString() + "行数据！"),
            error => console.log("向DB中新增记录时出错！")
        );
    }

    // 新增行
    addNewRowPack(event){
        var newIndex:number = this.tableDataPack.length;
        var newItem = new Package();
        newItem.sid = "";

        this.tableDataPack = this.tableDataPack.concat(newItem);
        
        this.editCachePack[newIndex] = {
            edit: true,
            isNew: true,
            data: { ...this.tableDataPack[newIndex] }
        };

    }


      // 删除行
    deleteRowPack(index:number){
        let sid = this.tableDataPack[index].sid;

        this.packService.deleteBPK(sid).subscribe(
            val => console.log("删除了" + val.toString() + "行数据"),error => console.log("删除数据时出错！")
        );

        this.tableDataPack = this.tableDataPack.filter(item => item.sid !== sid);
    }
}
