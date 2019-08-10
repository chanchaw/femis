import { Component, OnInit } from '@angular/core';
import { MessageService } from "primeng/api";
import { StringUtilService } from 'src/app/shared/services';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  providers:[ StringUtilService ]
})
export class ContentComponent implements OnInit {

  properties:string = "";
  gsetter:string = "";
  splitSymbol:string = ";";// 间隔符号

  constructor(
    private msgService:MessageService
  ) { }

  ngOnInit() {
  }

  generateProperties(){
    this.gsetter = StringUtilService.geModel(this.properties,this.splitSymbol);
  }

}
