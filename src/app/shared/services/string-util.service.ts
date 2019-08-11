import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StringUtilService {


  constructor(){}


static geModel(attString:string,splitSymbol:string):string{
    //#region 1. 两个长度判断非法，处理掉空格
    var fields = attString.trim();
    if(fields.length <=0 ) {
      console.log("传入了空字符串，不可执行转换！");
      return
    }

    var arr:string[] = fields.split(splitSymbol);
    
    if( arr.length <=0 ) {
      console.log("分割后形成的数组长度为0，生成 Model 失败！");
      return
    }

    // 遍历数组，将数组每个元素的前后空格去掉
    for(var i=0;i<arr.length;i++){
      arr[i] = arr[i].replace(/[\r\n]/g,"");
      arr[i] = arr[i].replace(/\ +/g,"");
    }

    // 删除空字符串
    arr = arr.filter(
      ( item:string ) =>{
        return item.length>0;
      }
    );
    //#endregion


    //#region 2. 遍历数组声明私有属性，初始修改状态为false
    var rtn:string = "";
    rtn = `
/**
 * 代码生成器版本号：1.0
 * 生成时间：${new Date().toLocaleDateString()}  ${new Date().toLocaleTimeString()}
 * 设计理念：将所有属性写为 Getter Setter 的方式
 *          追加属性：change，用于维护模型实例的状态 
 *          - 当通过setter修改值时维护该状态为true表示对象被修改过 
 *          - 记得后端JAVA要忽略不存在的属性
 *          同时在 constructor 中初始化状态为 false 表示未修改，还提供一个恢复状态的方法 resetChange
 *          后端的 Date、timestamp 类型都被转换为 string ，前端可以格式化为字符串后传递给后端，
 *          对于第三方 UI 套件的兼容性更好
 */
constructor(){
    this._change = false;
}

resetChange(){
    this._change = false;
}

private _change:boolean = false;`

    for(var i = 0; i<arr.length; i++){
      // 以 : 分割字符串为数组，如果没有设置变量类型，默认为 string
      var ele = arr[i].split(":");
      if( ele.length ===1 ){
        ele[1] = "string";
      }

      console.log(ele);
      rtn = rtn + `
private _${ele[0]}:${ele[1]};`
    }
    //#endregion

    //#region 3. 再次遍历数组声明 Getter Setter 方法
    rtn = rtn +`
    `;
    for(var i = 0; i<arr.length; i++){
      /**
       * 字段构成的源字符串格式应该是：id:number,maind:number,codeid:string,goodsname:string
       * 一级分隔符是英文逗号，二级分隔符是冒号
       * 一级分隔符分隔形成的数组为：arr[0] = "id:number",arr[1] = "maind:number"
       * 即一个字段和其数据类型构成一个数组元素
       * 二级分隔符将一个数组元素按照冒号再度分隔，下标0为字段名称，1为数据类型
       */
      var ele = arr[i].split(":");
      if( ele.length === 1 ){
        ele[1] = "string";
      }

      rtn = rtn + `
get ${ele[0]}():${ele[1]}{
    return this._${ele[0]};
}
set ${ele[0]}(value:${ele[1]}){
    this._${ele[0]} = value;
    this._change = true;
}
`
    }
    //#endregion

    return rtn;
}    







}