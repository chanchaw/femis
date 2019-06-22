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
    path:'home01',
    loadChildren:'./pages/home01/home01.module#Home01Module',
    data:{ title:'首页',isRemove: true }
  },


  // 默认显示的路径
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
    data:{ title:'首页',isRemove:true }
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes), DxDataGridModule, DxFormModule],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [HomeComponent, ProfileComponent, DisplayDataComponent]
})
export class AppRoutingModule { }
