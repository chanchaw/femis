import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChroBillorderRoutingModule } from './chro-billorder-routing.module';
import { ContentComponent } from './content/content.component';

@NgModule({
  declarations: [ContentComponent],
  imports: [
    CommonModule,
    ChroBillorderRoutingModule
  ]
})
export class ChroBillorderModule { }
