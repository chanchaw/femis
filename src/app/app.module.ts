import { LayoutModule } from './layout/layout.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule, SingleCardModule } from './layouts';
import { FooterModule, LoginFormModule } from './shared/components';
import { AuthService, ScreenService, AppInfoService,SimpleReuseStrategyService,
  UserService,ContactCategoryService,TablestyleService } from './shared/services';
import { AppRoutingModule } from './app-routing.module';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';




//#region DevExtreme 国际化
import "devextreme/localization/globalize/number";
import "devextreme/localization/globalize/date";
import "devextreme/localization/globalize/currency";
import "devextreme/localization/globalize/message";
// Dictionaries for German and Russian languages
// import deMessages from "devextreme/localization/messages/de.json!json";
// import ruMessages from "devextreme/localization/messages/ru.json!json";
// Common and language-specific CLDR JSONs
// import supplemental from "devextreme-cldr-data/supplemental.json!json";
// import deCldrData from "devextreme-cldr-data/de.json!json";
// import ruCldrData from "devextreme-cldr-data/ru.json!json";
// In projects created with Angular CLI 6+
import deMessages from "devextreme/localization/messages/de.json";
import ruMessages from "devextreme/localization/messages/ru.json";
import zhMessages from "devextreme/localization/messages/zh.json";
import supplemental from "devextreme-cldr-data/supplemental.json";
import deCldrData from "devextreme-cldr-data/de.json";
import ruCldrData from "devextreme-cldr-data/ru.json";
import zhCldrData from "devextreme-cldr-data/zh.json";
import Globalize from "globalize";
Globalize.load(
supplemental, deCldrData, ruCldrData,zhCldrData
);
Globalize.loadMessages(deMessages);
Globalize.loadMessages(ruMessages);
Globalize.loadMessages(zhMessages);
Globalize.locale(navigator.language);
//#endregion



registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    FooterModule,
    LoginFormModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,LayoutModule
  ],
  providers: [AuthService, ScreenService, AppInfoService, { provide: NZ_I18N, useValue: zh_CN },
    SimpleReuseStrategyService,UserService,ContactCategoryService,TablestyleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
