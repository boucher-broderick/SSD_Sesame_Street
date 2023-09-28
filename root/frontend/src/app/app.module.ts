

import { ApplicationModule, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

//components
import { AppComponent } from './app.component';
import { TestComponent } from './components/test/test.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeModule } from './components/home/home.module';
import { PrimengModule } from './shared/modules/primeng/primeng.module';





@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    SignInComponent,
    SignUpComponent
 ,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HomeModule,
    PrimengModule,
    ApplicationModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
