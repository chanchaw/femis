import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Page03RoutingModule } from './page03-routing.module';
import { Page03Component } from './page03.component';
import { ContentComponent } from './content/content.component';

@NgModule({
  declarations: [Page03Component, ContentComponent],
  imports: [
    CommonModule,
    Page03RoutingModule
  ]
})
export class Page03Module { }
