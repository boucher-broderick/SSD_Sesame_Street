import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { MessagesModule } from 'primeng/messages';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    FormsModule,
    PasswordModule,
    MessagesModule
  ],
  exports: [  
    CommonModule,
    ButtonModule,
    TableModule,
    InputTextModule,
    FormsModule,
    PasswordModule,
    MessagesModule
  ]
})
export class PrimengModule { }
