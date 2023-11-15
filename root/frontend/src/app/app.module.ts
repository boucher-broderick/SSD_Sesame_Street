

import { ApplicationModule, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

//components
import { AppComponent } from './app.component';
import { TestComponent } from './components/test/test.component';
import { HomeModule } from './components/home/home.module';
import { PrimengModule } from './shared/modules/primeng/primeng.module';

import { QuillModule } from 'ngx-quill';


@NgModule({
  declarations: [
    AppComponent,
    TestComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HomeModule,
    PrimengModule,
    ApplicationModule,
    QuillModule.forRoot(),
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
