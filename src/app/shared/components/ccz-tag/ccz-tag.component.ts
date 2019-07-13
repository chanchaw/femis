import { NgZorroAntdModule } from 'ng-zorro-antd';
import { Component, OnInit, EventEmitter, Input, Output, ViewChild, 
  ElementRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-ccz-tag',
  templateUrl: './ccz-tag.component.html',
  styleUrls: ['./ccz-tag.component.scss']
})
export class CczTagComponent implements OnInit {

  @Input() data:string[] = [];// 外部调用本组件时传入的数据源，字符串数组
  tags:ccTag[] = [];// 父组件传递进来数据用于显示
  @Output() addNew:EventEmitter<string> = new EventEmitter();// 新增事件
  @Output() delete:EventEmitter<string> = new EventEmitter();// 删除
  @Output() update:EventEmitter<ChangeRecorder> = new EventEmitter();// 修改


  private skipClick:boolean = false;
  private changeRecorder:ChangeRecorder;
  
  inputVisible = false;
  inputValue = '';
  @ViewChild('inputElement',{static:false}) inputElement: ElementRef;
  @ViewChild('inputElementInArray',{static:false}) inputElementInArray: ElementRef;
  

  //#region 系统生命周期钩子
  constructor() { 
    this.initTags();
  }

  ngOnInit() {
    
  }
  //#endregion

  //#region 初始化数据
  initTags(){
    if(this.data.length>0){
      this.tags = [];
      this.data.forEach(ele => {
        let tag = new ccTag();
        tag.text = ele;
        tag.value = ele;
        tag.visible = true;

        this.tags.push(tag);
      });

      console.log("CczTag#initTags");

    }
  }
  //#endregion

  handleClose(removedTag: ccTag): void {
    this.tags = this.tags.filter(tag => tag !== removedTag);
    this.delete.emit(removedTag.text);// 发射删除事件
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

  // 数组反应到UI上的input
  showInputInArray(tag:ccTag){
    if(this.skipClick){
      this.skipClick = false;
      return;
    }

    // 显示输入框则记录oldValue
    this.changeRecorder = new ChangeRecorder();
    this.changeRecorder.oldValue=tag.text

    tag.visible=false;
    setTimeout(() => {
      this.inputElementInArray.nativeElement.focus();
    }, 10);
  }

  handleInputConfirmInArray(tag:ccTag){
    // 修改完毕记录newValue
    this.changeRecorder.newValue=tag.text;
    tag.visible=true;
    this.update.emit(this.changeRecorder);// 发送修改事件
  }

  handleInputConfirm(): void {
    var target:ccTag = new ccTag();
    target.text=this.inputValue;
    target.value=this.inputValue;
    target.visible=true;

    if (this.inputValue && this.tags.indexOf(target) === -1) {
      this.tags.push(target);

      this.addNew.emit(target.text);// 发射addNew事件

      this.inputValue='';
      this.showInput();
    }else{
      this.inputValue = '';
      this.inputVisible = false;
    }

  }

  onCloseTagInArray(){
    this.skipClick = true;
  }


  keydownInArray(e){
    console.log(e);
  }

  deleteTag(){
    console.log('正准备删除一个TAG！');
  }
}


export class ccTag{
  public text:string;
  public value:string;
  public visible:boolean;  
}

export class ChangeRecorder{
  public oldValue:string;
  public newValue:string;
}


@NgModule({
  declarations: [ CczTagComponent ],
  exports: [ CczTagComponent ],
  imports:[ NgZorroAntdModule,FormsModule,ReactiveFormsModule,CommonModule ]
})
export class CczTagModule { }