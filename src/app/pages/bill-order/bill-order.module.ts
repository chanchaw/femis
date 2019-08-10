import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { BillOrderRoutingModule } from './bill-order-routing.module';
import { ContentComponent } from './content/content.component';
import { BillOrderComponent } from './bill-order.component';

import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect';




@NgModule({
  declarations: [ContentComponent,BillOrderComponent],
  imports: [
    CommonModule,
    BillOrderRoutingModule,NgZorroAntdModule,FormsModule,ReactiveFormsModule,
    DragDropModule,TableModule,InputTextModule,ToastModule,ButtonModule,MultiSelectModule
  ],
  providers:[ MessageService ]
})
export class BillOrderModule { }
