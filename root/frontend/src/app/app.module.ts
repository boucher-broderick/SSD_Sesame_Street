import { ApplicationModule, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SidebarModule } from 'primeng/sidebar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//components
import { AppComponent } from './app.component';
import { TestComponent } from './components/test/test.component';
import { HomeModule } from './components/home/home.module';
import { PrimengModule } from './shared/modules/primeng/primeng.module';

import { QuillModule } from 'ngx-quill';
import { ErrorPageComponent } from './components/error-page/error-page.component';


@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    ErrorPageComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HomeModule,
    PrimengModule,
    ApplicationModule,
    QuillModule.forRoot(),
    BrowserAnimationsModule,
    SidebarModule
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
