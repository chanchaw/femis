import { Injectable } from '@angular/core';

/**
 * 2019年7月30日 07:52:29
 * 枚举数据类型的对应，从MySQL的数据类型对应到 TypeScript 的数据类型
 * 用于实现类似 Mybatis ，从表结构映射到 TypeScript 的 Model
 */
@Injectable({
  providedIn: 'root'
})
export class DatatypeMapService {

  constructor() { }

  mySQL2TypeScript:DatatypeMap[] = [
    { dbType:"varchar",tType:"string" },
    { dbType:"int",tType:"number" },
    { dbType:"float",tType:"number" },
    { dbType:"datetime",tType:"string" },
    { dbType:"timestamp",tType:"string" }
  ];
}

export class DatatypeMap{
  dbType:string;
  tType:string;
}
