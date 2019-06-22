import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Home01Component } from './home01.component';

const routes: Routes = [ {
  path:'',component:Home01Component
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Home01RoutingModule { }
