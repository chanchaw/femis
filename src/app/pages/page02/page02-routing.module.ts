import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Page02Component } from './page02.component';

const routes: Routes = [ {path:'',component:Page02Component} ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Page02RoutingModule { }
