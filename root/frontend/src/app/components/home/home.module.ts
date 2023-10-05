import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { HomeBodyComponent } from './home-body/home-body.component';
import { HomeNavbarComponent } from './home-navbar/home-navbar.component';
import { HomeComponent } from './home.component';
import { PrimengModule } from 'src/app/shared/modules/primeng/primeng.module';



@NgModule({
  declarations: [
    HomeComponent,
    HomeBodyComponent,
    HomeNavbarComponent
  ],
  imports: [
    CommonModule,
    PrimengModule,
    NgOptimizedImage
  ]
})
export class HomeModule { }
