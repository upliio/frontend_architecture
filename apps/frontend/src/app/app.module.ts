import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HomeComponent} from './startpage/home.component';
import {RegisterComponent} from './startpage/auth/register/register.component';
import {LoginComponent} from './startpage/auth/login/login.component';
import {StartpageWrapperComponent} from './startpage/wrapper/startpage-wrapper.component';
import {ForgotPasswordComponent} from './startpage/auth/forgot-password/forgot-password.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ApiHttpInterceptor} from './http-interceptor.service';
import {en_US, NZ_I18N} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {NgZorroAntdModuleModule} from './ng-zorro-antd-module.module';
import {IconDefinition} from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import {NZ_ICONS} from 'ng-zorro-antd/icon';
import {PricingComponent} from './startpage/pricing/pricing.component';

registerLocaleData(en);

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key]);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    StartpageWrapperComponent,
    ForgotPasswordComponent,
    PricingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModuleModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiHttpInterceptor,
      multi: true
    },
    {provide: NZ_I18N, useValue: en_US},
    {provide: NZ_ICONS, useValue: icons}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
