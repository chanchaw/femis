import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from './layout.component';

export const ROUTES: Routes = [
  {
    path: '', // 当访问 /page1的时候显示Page1Component组件
    component: LayoutComponent
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ],
  exports: [
    RouterModule
  ]
})
export class LayoutRouteModule {
}
