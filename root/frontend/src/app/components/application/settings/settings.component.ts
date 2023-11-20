import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SettingsService } from './settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  providers: [MessageService]
})
export class SettingsComponent {

  username: string = "";
  email: string = "";
  password: string = "";
  retype: string = "";
  id!: string;

  constructor(private settingsService: SettingsService, private messageService: MessageService){
    var id = sessionStorage.getItem("user");
    if(id) this.id= id.replace(/['"]+/g, '');
    else this.id = '';
  }

  onUpdate(type: string){
    if(type == "email" && this.email!=""){
      this.settingsService.editUserInto(this.id, type, this.email).subscribe((response) =>{
        if(response.status != 200){
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response.error });
          console.log(response.error);
        }
        else{
          this.email = "";
          this.messageService.add({ severity: 'success', summary: 'Success', detail: "User information updated" });
        }
      })
    }
    else if(type == "username" && this.username!=""){
      this.settingsService.editUserInto(this.id, type, this.username).subscribe((response) =>{
        if(response.status != 200){
          this.messageService.add({ severity: 'error', summary: 'Error', detail: response.error });
          console.log(response.error);
        }
        else{
          this.username = "";
          this.messageService.add({ severity: 'success', summary: 'Success', detail: "User information updated" });
        }

      })
    }
    else if(type == "password" && this.password!=""){
      if(this.password == this.retype){
        this.settingsService.editUserInto(this.id, type, this.password).subscribe((response) =>{
          if(response.status != 200){
            this.messageService.add({ severity: 'error', summary: 'Error', detail: response.error });
            console.log(response.error);
          }
          else{
            this.password = "";
            this.retype = "";
            this.messageService.add({ severity: 'success', summary: 'Success', detail: "User information updated" });
          }
        })
      }
      else{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: "Passwords do not match" });
      }
    }
    else{
      this.messageService.add({ severity: 'error', summary: 'Error', detail: "Invalid Entry" });
    }

  }

}
