import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { ContactCompanyRoutingModule } from './contact-company-routing.module';
import { ContentComponent } from './content/content.component';
import { ContactCompanyComponent } from './contact-company.component';
import { DxDataGridModule,DxDropDownBoxModule,DxTagBoxModule } from 'devextreme-angular';


@NgModule({
  declarations: [ContentComponent,ContactCompanyComponent],
  imports: [
    CommonModule,
    ContactCompanyRoutingModule,NgZorroAntdModule,DxDataGridModule,DxDropDownBoxModule,DxTagBoxModule,
    FormsModule,ReactiveFormsModule
  ]
})
export class ContactCompanyModule { }
