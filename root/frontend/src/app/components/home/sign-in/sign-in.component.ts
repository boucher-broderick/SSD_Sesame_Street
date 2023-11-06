import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  public email: string = "";
  public password: string = "";
  constructor(private _router:Router, private homeService: HomeService) { }


  signIn(){
    console.log("here");
    this.homeService.onSignIn({email: this.email, password: this.password}).subscribe((data)=>{
      if(data.status == 200){
        const stringValue = JSON.stringify(data["_id"]);
        sessionStorage.setItem("user", stringValue);
        this._router.navigate(['application']);
      }
      else{
        console.log(data.error);
      }
    })
  }
}
