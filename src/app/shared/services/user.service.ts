import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as model from './model';

const contextPath:string = 'http://localhost:8080/femisnsb';
const pre:string="/user";

export class User{
  id:number;
  userid:string;
  username:string;
  telephone:string;
  mail:string;
  password:string;
  remark:string;
  deptid:number;
  status:number;
  operator:string;
  operatetime:string;
  operateip:string;
}

export class Url{
  static insert:string=contextPath + pre + '/insert';
  static updateByPrimaryKey:string=contextPath + pre+ '/updateByPrimaryKey'// 表单参数
  static getByUserid:string=contextPath + pre+ '/getByUserid';// string类型路径参数 - 用户ID
  static getAll:string=contextPath + pre+ '/getAll';// 无参数
  static getAllValid:string=contextPath + pre+ '/getAllValid';// 无参数
  static getAllInvalid:string=contextPath + pre+ '/getAllInvalid';// 无参数
  static login:string=contextPath + pre + '/login';//登录请求
  static logout:string=contextPath + pre + '/logout';//登录
  static isLogined=contextPath+pre+'/isLogined';//检测是否已经登录
  static index:string=contextPath + '/ng/index.html';//跳转到主页
}

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(
    private http:HttpClient
  ) {}

  insert(instance:User):Observable<any>{
    return this.http.post<any>(Url.insert,instance);
  }

  deleteByPrimaryKey(id:number):Observable<any>{
    var url = this.deleteByPrimaryKey + '/' + id;
    return this.http.get<any>(url);
  }

  deleteByUserid(userId:string):Observable<any>{
    var url=this.deleteByUserid + '/' + userId;
    return this.http.get<any>(url);
  }

  updateByPrimaryKey(instance:User):Observable<any>{
    return this.http.post<any>(Url.updateByPrimaryKey,instance);
  }

  getByUserid(userId:string):Observable<User[]>{
    var url=Url.getByUserid + '/' + userId;
    console.log('getByUserid#url:');
    console.log(url);
    
    return this.http.get<User[]>(url);
  }

  getAll():Observable<User[]>{
    return this.http.get<User[]>(Url.getAll);
  }

  getAllValid():Observable<User[]>{
    return this.http.get<User[]>(Url.getAllValid);
  }

  getAllInvalid():Observable<User[]>{
    return this.http.get<User[]>(Url.getAllInvalid);
  }

  login(userId:string,password:string):Observable<model.JsonData>{
    var url=Url.login + '/' + userId + '/' + password;
    console.log('登录请求的url是：' + url);
    
    return this.http.get<model.JsonData>(url);
  }

  logout():Observable<void>{
    console.log('user.service.ts#logout,请求的url是：'+Url.logout);
    console.log('user.service.ts#logout,开始发送get请求!');
    
    return this.http.get<void>(Url.logout);
  }

  isLogined():Observable<boolean>{
    console.log('测试认证状态的url是：' + Url.isLogined);    
    return this.http.get<boolean>(Url.isLogined);
  }

  toIndex():Observable<any>{
    console.log('即将跳转到主页，其URL是：'+Url.index);
    return this.http.get<any>(Url.index);
  }
}
