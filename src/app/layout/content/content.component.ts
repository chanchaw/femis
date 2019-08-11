import { User } from './../../shared/services/user.service';
import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd';
import { TabComponent } from '../tab/tab.component';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  tplModal:NzModalRef;
   
  @ViewChild('tplTitle',{static:false})
  private tplTitle:TemplateRef<string>;

  @ViewChild('tplContent',{static:false})
  private tplContent:TemplateRef<string>;

  @ViewChild('tplFooter',{static:false})
  private tplFooter:TemplateRef<string>;

  @ViewChild('ctlUserId',{static:false})
  private ctlUserId:ElementRef;

  @ViewChild('ctlPassword',{static:false})
  private ctlPassword:ElementRef;

  //标签页组件
  @ViewChild('tabComponent',{static:false})
  tabComponent:TabComponent

  private focusNodeList:NodeListOf<Element>;
  private focusArray:any[];
  private attrName:string='ccc';
  
  

  private loginModalIsVisible:boolean=false;
  private users:User[] = [];
  private userUI:User=new User();
  // private vrUserid:model.ValidateResult=new model.ValidateResult();
  // private vrPassword:model.ValidateResult=new model.ValidateResult();
  private vrUserid:any;
  private vrPassword:any;

  //侧边栏菜单是否折叠
  isCollapsed:boolean = true;

  private curUrl:any;
  

  constructor(
    private router:Router,
    private modalService:NzModalService,
    private userService:UserService
    // private noti:NzNotificationService
    // private reflect:ReflectUtilService
  ){}


  ngOnInit() {
    this.setUseIdFocus();
  }

  ngAfterViewInit(){
    this.checkLogined();
  }


  //#region 初始化时用到的方法
  setUseIdFocus(){
    if(this.loginModalIsVisible===true){
      setTimeout(() => {
        this.ctlUserId.nativeElement.focus();
      }, 300);
    }
  }

  //没有登录则显示登录框
  checkLogined(){
    // 2019年6月19日 17:00:38
    // console.log('进入checkLogined');
    // this.userService.isLogined().subscribe(
    //   val=>{
    //     console.log('验证是否已登录的结果是：' + val);
    //     this.loginModalIsVisible = !val;
    //   },error=>{console.log('验证是否已登录时出错！');}
    // );
    this.loginModalIsVisible = !this.loginModalIsVisible;
  }
  //#endregion

  tabs(data) {
    console.log('点击了链接，即将启动路由：' + data);
    this.router.navigate([data]);
  }
  
   
  showLogin(tplTitle: TemplateRef<{}>, tplContent: TemplateRef<{}>, tplFooter: TemplateRef<{}>): void {
    this.tplModal = this.modalService.create({
      nzTitle: tplTitle,
      nzContent: tplContent,
      nzFooter: tplFooter,
      nzMaskClosable: false,
      nzClosable: false,
      nzOnOk: () => console.log('Click ok')
    });
  }


  onClickUserid(e){
    // console.log('keyCode=' + e.keyCode + ',key=' + e.key);
    
    if(e.keyCode===13){//回车 - 填充名称并且跳转到密码文本框
      console.log('工号input上点击了回车');
      if(this.getUser(this.userUI.userid)===true){
        
      }
    }
  }

  getUser(userId:string):boolean{
    this.userService.getByUserid(userId).subscribe(
      (val:User[])=>{
        
        if(val.length>0){
          this.users=val;
          this.userUI.username=this.users[0].username;
          this.vrUserid.setSuccess(true);
          this.ctlPassword.nativeElement.focus();
          return true;
        }else{// 未找到该工号的员工
          console.log('工号不存在！');
          
          this.vrUserid.setSuccess(false);
          this.vrUserid.explain='工号不存在！';
          return false;
        }
      },error=>{
        console.log('根据用户ID获取用户时出错！');
        return false;
      }
    );

    return false;
  }


  checkPassword():boolean{
    this.vrUserid.setSuccess(true);
    this.vrPassword.setSuccess(true);

    if(this.users.length<=0){
      this.vrUserid.setSuccess(false);
      this.vrUserid.explain='工号不存在！'
      return false;
    }

    if(this.users[0].password!==this.userUI.password){
      this.vrPassword.setSuccess(false);
      this.vrPassword.explain='密码错误！'
      return false;
    }


    return true;
  }

  onClickPassword(e){
    // console.log(e);
    if(e.keyCode===13){//将回车转换为TAB
      console.log('keycode=13');
      this.doLogin();
      /*
      if(this.checkPassword()===true){
        this.loginModalIsVisible=false;
      }
      */
    }
  }


  initTabArray(){// 初始化 - 获取所有拥有获取焦点的属性的元素
    // this.attrName='ccTabIndex';
    console.log('属性名称是：' + this.attrName);
    
    // this.focusNodeList = document.querySelectorAll("input");
    // console.log(this.focusNodeList);

    console.log(document.querySelectorAll("[chanchaw]"));
    
    this.focusArray=Array.from(this.focusNodeList);
    console.log('NodeListOf转换为数组后是：');
    console.log(this.focusArray);

    // this.focusArray.sort((a:Element,b:Element):number=>{
    //   var i:number=parseInt(a.getAttribute(this.attrName));
    //   var j:number=parseInt(b.getAttribute(this.attrName));
    //   return j-i;
    // });
    
    
  }

  moveNext(){// 焦点移动到下一个元素上
    if(this.focusNodeList.length<=0){
      return;
    }

    var currentEle=document.activeElement;

  }

  doLogin(){
    // this.focusArray.forEach(element => {
    //   console.log('tabIndex='+element.getAttribute('tabIndex')+',name='+element.getAttribute('name'));
    // });

    const userId: string = this.userUI.userid;
    const password: string = this.userUI.password;

    console.log('发送请求附带的参数，用户名是：' + userId + '，密码是：' + password);
    
    this.userService.login(userId,password).subscribe(
      val=>{
        console.log('登录请求返回的数据是：');
        console.log(val);
        
        if(val.success===false || val === null){
          console.log('登录认证失败！');
          
          this.loginModalIsVisible=true;
          // this.noti.error('登录失败',val.msg,{'nzDuration':2000});
        }else{
          console.log('登录认证成功！');
          
          this.loginModalIsVisible=false;
          // this.noti.success('success','登录成功！',{'nzDuration':2000});
          console.log('登录成功立即获取登录状态的结果是：');
          console.log(this.isLogined('doLogin内部！'));          
        }
      },error=>{console.log('登录时出错！');}
    );
  }

  logout(){

    console.log('logout点击了注销！');
    this.userService.logout().subscribe(
      val=>{//登出后显示登录框
        console.log('登出成功！');
        this.loginModalIsVisible=true;
      },
      error=>{
        console.log('登出时出错了！');
        console.log(error);
      }
    );
  }

  
  isLogined(pageName:string){//检测是否认证过了
    this.userService.isLogined().subscribe(
      val=>{
        console.log('触发事件的页面是：'+pageName+'，测试认证状态是：');
        console.log(val);
      },error=>{console.log('在测试是否已经登录时出错！');
      }
    );
  }


  //折叠、展开  侧边栏菜单
  toggleCollapsed(){
    this.isCollapsed = !this.isCollapsed;
  }


  // test(){// 测试
  //   console.log('进入登录页面的test:');
  //   var o:model.ContactCompany = new model.ContactCompany();
  //   o.account='我是源';

  //   var t:model.ContactCompany = this.reflect.deepCopy(o);
  //   o.account='我是源1';

  //   console.log(o);
  //   console.log(t);
  // }



  // testDynamic(){
    
  //   const modal = this.modalService.create({
  //     nzStyle:{top:'2px'},
  //     nzWidth:1300,
  //     nzTitle: '选择往来单位：',
  //     nzContent: ContactcompanyComponent,
  //     nzComponentParams: {
  //     },
  //     nzFooter: [{
  //       label: '选择',
  //       onClick: (componentInstance) => {
  //         console.log('选择的往来单位是：');
  //         console.log(componentInstance.selectedRow);
  //         componentInstance.destroyModal();
  //       }
  //     }]
  //   });

  //   modal.afterOpen.subscribe(() => console.log('[afterOpen] emitted!'));

  //   // Return a result when closed
  //   modal.afterClose.subscribe((result) => console.log('[afterClose] The result is:', result));

  //   // delay until modal instance created
  //   window.setTimeout(() => {
  //     const instance = modal.getContentComponent();
      
  //   }, 2000);
  // }


}
