import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  constructor(private _router:Router) { }

  public signIn(): void {
    this._router.navigate(['Application']);
  }

  public backToHome(): void {
    this._router.navigate(['']);
  }
}
