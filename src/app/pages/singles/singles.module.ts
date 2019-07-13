import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { SinglesRoutingModule } from './singles-routing.module';
import { SinglesComponent } from './singles.component';
import { ContentComponent } from './content/content.component';

import { NgZorroAntdModule } from 'ng-zorro-antd';

import { CczTagModule } from '../../shared/components';



@NgModule({
  declarations: [SinglesComponent, ContentComponent],
  imports: [
    CommonModule,
    SinglesRoutingModule,NgZorroAntdModule,CczTagModule,FormsModule,ReactiveFormsModule
  ]
})
export class SinglesModule { }
