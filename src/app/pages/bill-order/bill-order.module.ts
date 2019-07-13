import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { BillOrderRoutingModule } from './bill-order-routing.module';
import { ContentComponent } from './content/content.component';
import { BillOrderComponent } from './bill-order.component';


@NgModule({
  declarations: [ContentComponent,BillOrderComponent],
  imports: [
    CommonModule,
    BillOrderRoutingModule,NgZorroAntdModule,FormsModule,ReactiveFormsModule,DragDropModule,
    
  ]
})
export class BillOrderModule { }
