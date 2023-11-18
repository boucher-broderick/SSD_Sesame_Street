import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../home.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  providers: [MessageService]
})
export class SignInComponent {

  loading: boolean = false;

  public email: string = "";
  public password: string = "";
  constructor(private _router:Router, private homeService: HomeService, private messageService: MessageService) { }

  signIn(){
    console.log("here");
    this.homeService.onSignIn({email: this.email, password: this.password}).subscribe((data)=>{
      if(data.status == 200){
        const stringValue = JSON.stringify(data["_id"]);
        sessionStorage.setItem("user", stringValue);
        this._router.navigate(['application']);
      }
      else{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Sign-in failed: incorrect email or password' });
        console.log(data.error);
      }
    })
  }

  load() {
        this.loading = true;
        setTimeout(() => {
            this.loading = false
        }, 2000);
  }
}
