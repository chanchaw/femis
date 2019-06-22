import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { map,filter,mergeMap } from 'rxjs/operators';
import { SimpleReuseStrategyService } from 'src/app/shared/services';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {

  ngOnInit(){}

// 路由列表
menuList = [];
// 当前选择的tab index
currentIndex = 0;
constructor(private router: Router,
            private activatedRoute: ActivatedRoute,
            private titleService: Title) {

  // 制作时间：2018年9月19日 10:32:34
  this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    map(() => this.activatedRoute),
    map(route => {
      while (route.firstChild) { route = route.firstChild; }
      return route;
    }),
    filter(route => route.outlet === 'primary'),
    mergeMap(route => route.data)
  )
  .subscribe((event) => {
    // 路由data的标题
    const menu = {...event};
    menu.url = this.router.url
    const url = menu.url;
    var title:string;
    if(menu.title === undefined || menu.title ===null || menu.title===""){
      title = "未命名";
    }else{
      title = menu.title;
    }

    this.titleService.setTitle(title); // 设置网页标题
    const exitMenu = this.menuList.find(info => info.url === url);
    if (!exitMenu) {// 如果不存在那么不添加，
      this.menuList.push(menu);
    }
    this.currentIndex = this.menuList.findIndex(p => p.url === url);
  });
}

// 关闭选项标签
closeUrl(url: string) {
  if (url === "/home01") {
    return;
  } else{
    console.log('不是 page01');
    console.log(url);
  }

  // 当前关闭的是第几个路由
  const index = this.menuList.findIndex(p => p.url === url);
  
  /*
    不可以关闭最后一个标签页 - 至少保留显示一个标签页
    在2018年11月27日 14:58:17注释掉 - 解决右侧默认显示APP副本
  if (this.menuList.length === 1) {
    return;
  }
  */

  this.menuList.splice(index, 1);
  // 删除复用
  // delete SimpleReuseStrategyService.handlers[module];
  SimpleReuseStrategyService.deleteRouteSnapshot(url)
  // 如果当前删除的对象是当前选中的，那么需要跳转
  if (this.currentIndex === index) {
    // 显示上一个选中
    let menu = this.menuList[index - 1];
    if (!menu) {// 如果上一个没有下一个选中
      menu = this.menuList[index];
    }
    // 跳转路由
    this.router.navigate([menu.url]);    }
}
/**
 * tab发生改变
 */
nzSelectChange($event) {
  this.currentIndex = $event.index;
  const menu = this.menuList[this.currentIndex];
  // 跳转路由
  this.router.navigate([menu.url]);
}


closeAllTabs(){//关闭所有标签页
  this.menuList.forEach(element => {
    this.closeUrl(element.url);
    console.log('已关闭标签页url=' + element.url);
  });
}

}
