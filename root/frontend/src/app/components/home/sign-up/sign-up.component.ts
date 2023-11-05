import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

    constructor(private _router:Router){}

    signUp(){
      const stringValue = JSON.stringify(0);
      sessionStorage.setItem("user", stringValue);
      this._router.navigate(['application']);
    }
}
