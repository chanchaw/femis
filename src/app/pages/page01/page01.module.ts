import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { Page01RoutingModule } from './page01-routing.module';
import { Page01Component } from './page01.component';
import { ContentComponent } from './content/content.component';

import { NgZorroAntdModule } from 'ng-zorro-antd';

@NgModule({
  declarations: [Page01Component, ContentComponent],
  imports: [
    CommonModule,
    Page01RoutingModule,FormsModule,ReactiveFormsModule,NgZorroAntdModule
  ]
})
export class Page01Module { }
