import { Page01Component } from './pages/page01/page01.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './shared/components';
import { AuthGuardService } from './shared/services';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { DisplayDataComponent } from './pages/display-data/display-data.component';
import { DxDataGridModule, DxFormModule } from 'devextreme-angular';

const routes: Routes = [
  // 下面是创建 DevExtreme 项目时候由 CLI 创建的
  { path: 'display-data',component: DisplayDataComponent,canActivate: [ AuthGuardService ] },
  { path: 'profile',component: ProfileComponent,canActivate: [ AuthGuardService ] },
  { path: 'home',component: HomeComponent,canActivate: [ AuthGuardService ] },
  { path: 'login-form',component: LoginFormComponent,canActivate: [ AuthGuardService ] },

  // 下面是自定义的路径
  // { path:'page01', component: Page01Component},
  { 
    path:'page01',
    loadChildren:'./pages/page01/page01.module#Page01Module',
    data:{ title:'page01',isRemove: true }
  },

  { 
    path:'page02',
    loadChildren:'./pages/page02/page02.module#Page02Module',
    data:{ title:'page02',isRemove: true }
  },

  { 
    path:'page03',
    loadChildren:'./pages/page03/page03.module#Page03Module',
    data:{ title:'page03',isRemove: true }
  },

  { 
    path:'contactCategory',
    loadChildren:'./pages/contact-category/contact-category.module#ContactCategoryModule',
    data:{ title:'往来单位类型',isRemove: true }
  },

  { 
    path:'contactCompany',
    loadChildren:'./pages/contact-company/contact-company.module#ContactCompanyModule',
    data:{ title:'往来单位',isRemove: true }
  },


  { 
    path:'singles',
    loadChildren:'./pages/singles/singles.module#SinglesModule',
    data:{ title:'简单类型',isRemove: true }
  },


  { 
    path:'febricOrder',
    loadChildren:'./pages/bill-order/bill-order.module#BillOrderModule',
    data:{ title:'面料订单',isRemove: true }
  },

  { 
    path:'stringGenerator',
    loadChildren:'./pages/string-generator/string-generator.module#StringGeneratorModule',
    data:{ title:'字符串生成',isRemove: true }
  },

  { 
    path:'mysqlTables',
    loadChildren:'./pages/mysql-tables/mysql-tables.module#MysqlTablesModule',
    data:{ title:'所有表',isRemove: true }
  },


  { 
    path:'home01',
    loadChildren:'./pages/home01/home01.module#Home01Module',
    data:{ title:'主页01',isRemove: true }
  },

  { 
    path:'test',
    loadChildren:'./pages/test/test.module#TestModule',
    data:{ title:'测试',isRemove: true }
  },



  // 默认显示的路径   contactCompany   
  // {
  //   path: '**',
  //   redirectTo: 'home',
  //   canActivate: [ AuthGuardService ],
  //   data:{ title:'首页',isRemove:true }
  // }
  {
    path: '**',
    redirectTo: 'home01',
    // canActivate: [ AuthGuardService ],
    data:{ title:'首页',isRemove:false }
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes), DxDataGridModule, DxFormModule],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [HomeComponent, ProfileComponent, DisplayDataComponent]
})
export class AppRoutingModule { }
