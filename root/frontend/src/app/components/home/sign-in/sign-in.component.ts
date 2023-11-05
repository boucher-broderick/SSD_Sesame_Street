import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  constructor(private _router:Router) { }


  signIn(){
    const stringValue = JSON.stringify(1);
    sessionStorage.setItem("user", stringValue);
    this._router.navigate(['application']);
  }
}
