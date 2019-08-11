import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Page02RoutingModule } from './page02-routing.module';
import { Page02Component } from './page02.component';
import { ContentComponent } from './content/content.component';

@NgModule({
  declarations: [ Page02Component,ContentComponent ],
  imports: [
    CommonModule,
    Page02RoutingModule
  ]
})
export class Page02Module { }
