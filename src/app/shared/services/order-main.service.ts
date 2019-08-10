import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class OrderMain{
 
/**
 * 代码生成器版本号：1.0
 * 生成时间：2019/8/3  上午7:49:29
 * 设计理念：将所有属性写为 Getter Setter 的方式
 *          追加属性：change，用于维护模型实例的状态 - 当通过setter修改值时维护该状态为true表示对象被修改过 - 记得后端JAVA要忽略不存在的属性
 *          同时在 constructor 中初始化状态为 false 表示未修改，还提供一个恢复状态的方法 resetChange
 */
constructor(){
  this._change = false;
}

resetChange(){
  this._change = false;
}

private _change:boolean = false;
private _id:number;
private _codeid:string;
private _billdate:string;
private _deliverytime:string;
private _clientid:string;
private _pactcode:string;
private _deliverytype:string;
private _invoice:number;
private _operator:string;
private _salesman:string;
private _contractor:string;
private _remark:string;
private _status:number;
private _updatedate:string;
private _updateuser:string;
private _billtype:string;
private _packmanner:string;
private _createdate:string;
private _createtime:string;
private _creator:string;
private _pactsum:number;
private _settlement:string;
private _salecategory:string;
  
get id():number{
  return this._id;
}
set id(value:number){
  this._id = value;
  this._change = true;
}

get codeid():string{
  return this._codeid;
}
set codeid(value:string){
  this._codeid = value;
  this._change = true;
}

get billdate():string{
  return this._billdate;
}
set billdate(value:string){
  this._billdate = value;
  this._change = true;
}

get deliverytime():string{
  return this._deliverytime;
}
set deliverytime(value:string){
  this._deliverytime = value;
  this._change = true;
}

get clientid():string{
  return this._clientid;
}
set clientid(value:string){
  this._clientid = value;
  this._change = true;
}

get pactcode():string{
  return this._pactcode;
}
set pactcode(value:string){
  this._pactcode = value;
  this._change = true;
}

get deliverytype():string{
  return this._deliverytype;
}
set deliverytype(value:string){
  this._deliverytype = value;
  this._change = true;
}

get invoice():number{
  return this._invoice;
}
set invoice(value:number){
  this._invoice = value;
  this._change = true;
}

get operator():string{
  return this._operator;
}
set operator(value:string){
  this._operator = value;
  this._change = true;
}

get salesman():string{
  return this._salesman;
}
set salesman(value:string){
  this._salesman = value;
  this._change = true;
}

get contractor():string{
  return this._contractor;
}
set contractor(value:string){
  this._contractor = value;
  this._change = true;
}

get remark():string{
  return this._remark;
}
set remark(value:string){
  this._remark = value;
  this._change = true;
}

get status():number{
  return this._status;
}
set status(value:number){
  this._status = value;
  this._change = true;
}

get updatedate():string{
  return this._updatedate;
}
set updatedate(value:string){
  this._updatedate = value;
  this._change = true;
}

get updateuser():string{
  return this._updateuser;
}
set updateuser(value:string){
  this._updateuser = value;
  this._change = true;
}

get billtype():string{
  return this._billtype;
}
set billtype(value:string){
  this._billtype = value;
  this._change = true;
}

get packmanner():string{
  return this._packmanner;
}
set packmanner(value:string){
  this._packmanner = value;
  this._change = true;
}

get createdate():string{
  return this._createdate;
}
set createdate(value:string){
  this._createdate = value;
  this._change = true;
}

get createtime():string{
  return this._createtime;
}
set createtime(value:string){
  this._createtime = value;
  this._change = true;
}

get creator():string{
  return this._creator;
}
set creator(value:string){
  this._creator = value;
  this._change = true;
}

get pactsum():number{
  return this._pactsum;
}
set pactsum(value:number){
  this._pactsum = value;
  this._change = true;
}

get settlement():string{
  return this._settlement;
}
set settlement(value:string){
  this._settlement = value;
  this._change = true;
}

get salecategory():string{
  return this._salecategory;
}
set salecategory(value:string){
  this._salecategory = value;
  this._change = true;
}





}

const contextPath:string = 'http://localhost:8080/femisnsb';
const pre:string="/orderMain";

@Injectable({
  providedIn: 'root'
})
export class OrderMainService {

  url ={
    'insert':contextPath + pre + '/insert',
    'deleteByPrimaryKey':contextPath + pre + '/deleteByPrimaryKey',
    'updateByPrimaryKey':contextPath + pre + '/updateByPrimaryKey',
    'getByPrimaryKey':contextPath + pre + '/getByPrimaryKey',
    'getAllOrderCode':contextPath + pre + '/getAllOrderCode',
    'getAll':contextPath + pre + '/getAll',
    'getLast':contextPath + pre + '/getLast',
    'getFirst':contextPath + pre + '/getFirst',
    'getPrevious':contextPath + pre + '/getPrevious',
    'getNext':contextPath + pre + '/getNext',
    'save':contextPath + pre + '/save'
  }
  constructor(
    private http:HttpClient
  ) { }

  getLast():Observable<OrderMain>{
    return this.http.get<OrderMain>(this.url.getLast);
  }

  getFirst():Observable<OrderMain>{
    return this.http.get<OrderMain>(this.url.getFirst);
  }

  getPrevious(key:number):Observable<OrderMain>{
    return this.http.get<OrderMain>(this.url.getPrevious + '/' + key.toString());
  }

  getNext(key:number):Observable<OrderMain>{
    return this.http.get<OrderMain>(this.url.getNext + '/' + key.toString());
  }


  insert(record:OrderMain):Observable<number>{
    return this.http.post<number>(this.url.insert,record);
  }

  deleteByPrimaryKey(key:number):Observable<number>{
    return this.http.get<number>(this.url.deleteByPrimaryKey + '/' + key);
  }

  updateByPrimaryKey(record:OrderMain):Observable<number>{
    return this.http.post<number>(this.url.updateByPrimaryKey,record);
  }

  getByPrimaryKey(key:number):Observable<OrderMain>{
    return this.http.get<OrderMain>(this.url.getByPrimaryKey + '/' + key);
  }

  getAll():Observable<OrderMain[]>{
    return this.http.get<OrderMain[]>(this.url.getAll);
  }

  getAllOrderCode():Observable<string[]>{
    return this.http.get<string[]>(this.url.getAllOrderCode);
  }

  save(record:OrderMain):Observable<number>{
    return this.http.post<number>(this.url.save,record);
  }
}
