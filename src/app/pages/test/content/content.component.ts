import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  ordermain:OrderMain = new OrderMain();
  url = "http://localhost:8080/femisnsb/orderMain/save";
  constructor(
    private http:HttpClient
  ) { }

  ngOnInit() {
  }

  save(){
    console.log("发送请求的对象是：");
    console.log(this.ordermain);
    
    this.http.post(this.url,this.ordermain).subscribe(
      ( res:number ) => console.log("保存的返回结果是：" + res.toString()),
      error => console.log("保存时失败！")
    );
  }

}


export class OrderMain{
  private _codeid:string;
  private _pactcode:string;

  get codeid():string{
    return this._codeid;
  }
  set codeid(value:string){
    this._codeid = value;
  }

  get pactcode():string{
    return this._pactcode;
  }
  set pactcode(value:string){
    this._pactcode = value;
  }

}
