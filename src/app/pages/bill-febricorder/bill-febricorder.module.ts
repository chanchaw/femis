import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillFebricorderRoutingModule } from './bill-febricorder-routing.module';
import { BillFebricorderComponent } from './bill-febricorder.component';

import { NgZorroAntdModule } from 'ng-zorro-antd';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [ BillFebricorderComponent ],
  imports: [
    CommonModule,
    BillFebricorderRoutingModule,NgZorroAntdModule,TableModule,InputTextModule
  ]
})
export class BillFebricorderModule { }
