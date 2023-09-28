import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-navbar',
  templateUrl: './home-navbar.component.html',
  styleUrls: ['./home-navbar.component.css']
})
export class HomeNavbarComponent {

  constructor(private _router:Router) { }

  RedirectToSignIn()
  {
    this._router.navigate(['SignIn']);
  }

 RedirectToSignUp()
  {
    this._router.navigate(['SignUp']);
  }

}
