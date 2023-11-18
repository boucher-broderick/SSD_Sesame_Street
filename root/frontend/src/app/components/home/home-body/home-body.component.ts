import { Component } from '@angular/core';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-home-body',
  templateUrl: './home-body.component.html',
  styleUrls: ['./home-body.component.css']
})
export class HomeBodyComponent {
  public screen: number = 0;

  constructor(private homeService: HomeService){}

  // to see which screen should be displayed
  ngOnInit(){
    this.homeService.getComponent().subscribe((screen) =>{
      this.screen = screen;
    }
    )
  }
}
