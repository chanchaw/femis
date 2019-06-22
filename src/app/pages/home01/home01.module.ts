import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Home01RoutingModule } from './home01-routing.module';
import { Home01Component } from './home01.component';
import { ContentComponent } from './content/content.component';

@NgModule({
  declarations: [Home01Component, ContentComponent],
  imports: [
    CommonModule,
    Home01RoutingModule
  ]
})
export class Home01Module { }
