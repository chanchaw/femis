import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Page01RoutingModule } from './page01-routing.module';
import { Page01Component } from './page01.component';
import { ContentComponent } from './content/content.component';

@NgModule({
  declarations: [Page01Component, ContentComponent],
  imports: [
    CommonModule,
    Page01RoutingModule
  ],
  exports:[ Page01Component ]
})
export class Page01Module { }
