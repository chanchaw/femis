import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StringGeneratorRoutingModule } from './string-generator-routing.module';
import { StringGeneratorComponent } from './string-generator.component';
import { ContentComponent } from './content/content.component';

import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { MessageService } from 'primeng/api';


@NgModule({
  declarations: [ContentComponent,StringGeneratorComponent],
  imports: [
    CommonModule,
    StringGeneratorRoutingModule,NgZorroAntdModule,FormsModule,ReactiveFormsModule,TableModule
  ],
  providers:[MessageService]
})
export class StringGeneratorModule { }
