import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { HomeBodyComponent } from './home-body/home-body.component';
import { HomeNavbarComponent } from './home-navbar/home-navbar.component';
import { HomeComponent } from './home.component';
import { PrimengModule } from 'src/app/shared/modules/primeng/primeng.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MessageService } from 'primeng/api';



@NgModule({
  providers: [
    MessageService
  ],
  declarations: [
    HomeComponent,
    HomeBodyComponent,
    HomeNavbarComponent,
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    PrimengModule,
    NgOptimizedImage
  ]
})
export class HomeModule { }
