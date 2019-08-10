import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MysqlTablesComponent } from './mysql-tables.component';

const routes: Routes = [
  { path:'',component:MysqlTablesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MysqlTablesRoutingModule { }
