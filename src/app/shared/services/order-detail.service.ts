import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export class OrderDetailProto{
  id:number;mainid:number;ordercode:string;oordercode:string;stylecode:string;goodsname:string;
  spec01:string;spec02:string;size:string;colorcode:string;colorname:string;color:string;meter:number;
  kg:number;yard:number;chargeunit:string;price:number;amount:number;platemake:number;sample:number;
  remark:string;createtime:string;creator:string;updatetime:string;updater:string;status:number;
}

export class OrderDetail{
    
  /**
   * 代码生成器版本号：1.0
   * 生成时间：2019/8/3  上午7:51:17
   * 设计理念：将所有属性写为 Getter Setter 的方式
   *          追加属性：change，用于维护模型实例的状态 
   *          - 当通过setter修改值时维护该状态为true表示对象被修改过 
   *          - 记得后端JAVA要忽略不存在的属性
   *          同时在 constructor 中初始化状态为 false 表示未修改，还提供一个恢复状态的方法 resetChange
   */
  constructor(){
    this._change = false;
  }

  resetChange(){
    this._change = false;
  }

  data:OrderDetailProto = new OrderDetailProto();
  applyData(){
    this.data.creator = this._creator;
    this.data.amount = this._amount;
    this.data.chargeunit = this._chargeunit;
    this.data.color = this._color;
    this.data.colorcode = this._colorcode;
    this.data.colorname = this._colorname;
    this.data.createtime = this._createtime;
    this.data.goodsname = this._goodsname;
    this.data.id = this._id;
    this.data.kg = this._kg;
    this.data.mainid = this._mainid;


    this.data.meter = this._meter;
    this.data.oordercode = this._oordercode;
    this.data.ordercode = this._ordercode;
    this.data.platemake = this._platemake;
    this.data.price = this._price;
    this.data.remark = this._remark;
    this.data.sample = this._sample;
    this.data.size = this._size;
    this.data.spec01 = this._spec01;


    this.data.spec02 = this._spec02;
    this.data.status = this._status;
    this.data.stylecode = this._stylecode;
    this.data.updater = this._updater;
    this.data.updatetime = this._updatetime;
    this.data.yard = this._yard;
  }

  private _change:boolean = false;
  private _id:number;
  private _mainid:number;
  private _ordercode:string;
  private _oordercode:string;
  private _stylecode:string;
  private _goodsname:string;
  private _spec01:string;
  private _spec02:string;
  private _size:string;
  private _colorcode:string;
  private _colorname:string;
  private _color:string;
  private _meter:number;
  private _kg:number;
  private _yard:number;
  private _chargeunit:string;
  private _price:number;
  private _amount:number;
  private _platemake:number;
  private _sample:number;
  private _remark:string;
  private _createtime:string;
  private _creator:string;
  private _updatetime:string;
  private _updater:string;
  private _status:number;
    
  get id():number{
    return this._id;
  }
  set id(value:number){
    this._id = value;
    this._change = true;
    this.applyData();
  }

  get mainid():number{
    return this._mainid;
  }
  set mainid(value:number){
    this._mainid = value;
    this._change = true;
    this.applyData();
  }

  get ordercode():string{
    return this._ordercode;
  }
  set ordercode(value:string){
    this._ordercode = value;
    this._change = true;
    this.applyData();
  }

  get oordercode():string{
    return this._oordercode;
  }
  set oordercode(value:string){
    this._oordercode = value;
    this._change = true;
    this.applyData();
  }

  get stylecode():string{
    return this._stylecode;
  }
  set stylecode(value:string){
    this._stylecode = value;
    this._change = true;
    this.applyData();
  }

  get goodsname():string{
    return this._goodsname;
  }
  set goodsname(value:string){
    this._goodsname = value;
    this._change = true;
    this.applyData();
  }

  get spec01():string{
    return this._spec01;
  }
  set spec01(value:string){
    this._spec01 = value;
    this._change = true;
    this.applyData();
  }

  get spec02():string{
    return this._spec02;
  }
  set spec02(value:string){
    this._spec02 = value;
    this._change = true;
    this.applyData();
  }

  get size():string{
    return this._size;
  }
  set size(value:string){
    this._size = value;
    this._change = true;
    this.applyData();
  }

  get colorcode():string{
    return this._colorcode;
  }
  set colorcode(value:string){
    this._colorcode = value;
    this._change = true;
    this.applyData();
  }

  get colorname():string{
    return this._colorname;
  }
  set colorname(value:string){
    this._colorname = value;
    this._change = true;
    this.applyData();
  }

  get color():string{
    return this._color;
  }
  set color(value:string){
    this._color = value;
    this._change = true;
    this.applyData();
  }

  get meter():number{
    return this._meter;
  }
  set meter(value:number){
    this._meter = value;
    this._change = true;
    this.applyData();
  }

  get kg():number{
    return this._kg;
  }
  set kg(value:number){
    this._kg = value;
    this._change = true;
    this.applyData();
  }

  get yard():number{
    return this._yard;
  }
  set yard(value:number){
    this._yard = value;
    this._change = true;
    this.applyData();
  }

  get chargeunit():string{
    return this._chargeunit;
  }
  set chargeunit(value:string){
    this._chargeunit = value;
    this._change = true;
    this.applyData();
  }

  get price():number{
    return this._price;
  }
  set price(value:number){
    this._price = value;
    this._change = true;
    this.applyData();
  }

  get amount():number{
    return this._amount;
  }
  set amount(value:number){
    this._amount = value;
    this._change = true;
    this.applyData();
  }

  get platemake():number{
    return this._platemake;
  }
  set platemake(value:number){
    this._platemake = value;
    this._change = true;
    this.applyData();
  }

  get sample():number{
    return this._sample;
  }
  set sample(value:number){
    this._sample = value;
    this._change = true;
    this.applyData();
  }

  get remark():string{
    return this._remark;
  }
  set remark(value:string){
    this._remark = value;
    this._change = true;
    this.applyData();
  }

  get createtime():string{
    return this._createtime;
  }
  set createtime(value:string){
    this._createtime = value;
    this._change = true;
    this.applyData();
  }

  get creator():string{
    return this._creator;
  }
  set creator(value:string){
    this._creator = value;
    this._change = true;
    this.applyData();
  }

  get updatetime():string{
    return this._updatetime;
  }
  set updatetime(value:string){
    this._updatetime = value;
    this._change = true;
    this.applyData();
  }

  get updater():string{
    return this._updater;
  }
  set updater(value:string){
    this._updater = value;
    this._change = true;
    this.applyData();
  }

  get status():number{
    return this._status;
  }
  set status(value:number){
    this._status = value;
    this._change = true;
    this.applyData();
  }



}

const contextPath:string = 'http://localhost:8080/femisnsb';
const pre:string="/orderDetail";

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {

  url = {
    "insert":contextPath + pre + '/insert',
    "insertBatch":contextPath + pre + '/insertBatch',
    "deleteByPrimaryKey":contextPath + pre + '/deleteByPrimaryKey',
    "updateByPrimaryKey":contextPath + pre + '/updateByPrimaryKey',
    "getByPrimaryKey":contextPath + pre + '/getByPrimaryKey',
    "getByMainId":contextPath + pre + '/getByMainId',
    "getAllOrderCode":contextPath + pre + '/getAllOrderCode',
    "save":contextPath + pre + '/save',
    "saveList":contextPath + pre + '/saveList',
  }
  constructor(
    private http:HttpClient
  ) { }

  insert(record:OrderDetail):Observable<number>{
    return this.http.post<number>(this.url.insert,record);
  }

  insertBatch(record:OrderDetail[]):Observable<OrderDetail[]>{
    return this.http.post<OrderDetail[]>(this.url.insert,record);
  }

  deleteByPrimaryKey(key:number):Observable<number>{
    const url = this.url.deleteByPrimaryKey + '/' + key.toString();
    console.log("删除行的URL：" + url);
    return this.http.get<number>(url);
  }

  updateByPrimaryKey(record:OrderDetail):Observable<number>{
    return this.http.post<number>(this.url.updateByPrimaryKey,record);
  }

  getByPrimaryKey(key:number):Observable<number>{
    return this.http.get<number>(this.url.getByPrimaryKey + '/' + key.toString());
  }

  getByMainId(key:number):Observable<OrderDetail[]>{
    return this.http.get<OrderDetail[]>(this.url.getByMainId + '/' + key.toString());
  }


  save(record:OrderDetail[]):Observable<any>{
    return this.http.post<any>(this.url.save,record);
  }

  saveList(records:OrderDetail[]):Observable<number>{
    return this.http.post<number>(this.url.saveList,records);
  }


}
