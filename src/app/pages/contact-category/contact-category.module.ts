import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactCategoryRoutingModule } from './contact-category-routing.module';
import { ContactCategoryComponent } from './contact-category.component';
import { ContentComponent } from './content/content.component';

import { DxDataGridModule,DxCheckBoxModule } from 'devextreme-angular';
import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  declarations: [ContactCategoryComponent,ContentComponent],
  imports: [
    CommonModule,
    ContactCategoryRoutingModule,DxDataGridModule,DxCheckBoxModule,NgZorroAntdModule
  ]
})
export class ContactCategoryModule { }
