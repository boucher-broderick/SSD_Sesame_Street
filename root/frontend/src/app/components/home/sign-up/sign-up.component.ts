import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  public username:string = "";
  public email:string = "";
  public password:string = "";
  public retypePassword:string = "";

    constructor(private _router:Router, private homeService: HomeService){}

    signUp(){
      if(this.username && this.email && this.password && this.retypePassword){
        if(this.password == this.retypePassword){
          var user: User ={
            username : this.username,
            email: this.email,
            password: this.password
          };
          this.homeService.onAddUser(user).subscribe((data)=>{
            if(data.status == 201){
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


    }
}
