import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { TestRoutingModule } from './test-routing.module';
import { TestComponent } from './test.component';
import { ContentComponent } from './content/content.component';

import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  declarations: [TestComponent, ContentComponent],
  imports: [
    CommonModule,
    TestRoutingModule,NgZorroAntdModule,HttpClientModule,
    FormsModule,ReactiveFormsModule
  ]
})
export class TestModule { }
