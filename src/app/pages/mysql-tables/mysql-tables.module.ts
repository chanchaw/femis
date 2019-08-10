import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { MysqlTablesRoutingModule } from './mysql-tables-routing.module';
import { ContentComponent } from './content/content.component';
import { MysqlTablesComponent } from './mysql-tables.component';

import { NgZorroAntdModule } from 'ng-zorro-antd';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { StickyHeaderDirective } from './sticky-header.directive';

@NgModule({
  declarations: [ContentComponent,MysqlTablesComponent,StickyHeaderDirective],
  imports: [
    CommonModule,
    MysqlTablesRoutingModule,FormsModule,ReactiveFormsModule,
    NgZorroAntdModule,TableModule,MultiSelectModule,InputTextModule,ToastModule,DragDropModule
  ],
  providers:[  ]
})
export class MysqlTablesModule { }
