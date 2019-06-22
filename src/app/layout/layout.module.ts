import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { ContentComponent } from './content/content.component';
import { TabComponent } from './tab/tab.component';
import { LayoutRouteModule } from './layout-route.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LayoutComponent,TabComponent,ContentComponent],
  imports: [ CommonModule,LayoutRouteModule,NgZorroAntdModule,FormsModule,ReactiveFormsModule ],
  exports:[ LayoutComponent,TabComponent,ContentComponent ]
})
export class LayoutModule { }
