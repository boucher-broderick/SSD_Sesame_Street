import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-home-navbar',
  templateUrl: './home-navbar.component.html',
  styleUrls: ['./home-navbar.component.css']
})
export class HomeNavbarComponent {

  private screen: number = 0;

  constructor(private homeService: HomeService){}
  
  //change the screen
  changeScreen(screen: number){
    this.homeService.changeComponent(screen);
  }
}

