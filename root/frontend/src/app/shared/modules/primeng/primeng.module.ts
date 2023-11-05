import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    FormsModule,
    PasswordModule
  ],
  exports: [  
    CommonModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    FormsModule,
    PasswordModule
  ]
})
export class PrimengModule { }
