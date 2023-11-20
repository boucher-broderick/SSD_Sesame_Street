import { Component } from '@angular/core';
import { HomeService } from '../../home/home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  private screen: number = 0;

  constructor(private _router:Router){

  }

  // change screens
  redirectToProjects(){
    this._router.navigate(['application/projects']);
  }

  redirectToHome(){
    sessionStorage.clear();
    this._router.navigate(['home']);
  }

  redirectToSettings(){
    this._router.navigate(['application/settings']);
  }


}
