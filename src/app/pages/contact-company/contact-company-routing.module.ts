import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactCompanyComponent } from './contact-company.component';

const routes: Routes = [ { path:'',component:ContactCompanyComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactCompanyRoutingModule { }
