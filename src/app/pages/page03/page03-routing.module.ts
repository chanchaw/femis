import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Page03Component } from './page03.component';

const routes: Routes = [ {path:'',component:Page03Component} ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Page03RoutingModule { }
