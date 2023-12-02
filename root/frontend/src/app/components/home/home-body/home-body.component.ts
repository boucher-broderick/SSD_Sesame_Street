import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home.service';
import { PhotoService } from '../photo.service';

@Component({
  selector: 'app-home-body',
  templateUrl: './home-body.component.html',
  styleUrls: ['./home-body.component.css'],
})
export class HomeBodyComponent implements OnInit {
  images: any[] | undefined;
  responsiveOptions: any[] | undefined;
  description = "StoryTeller Studio is a writer's planning tool that helps to gather and organize inspiration in the form of notes, links, songs, images, and many else.";
  public screen: number = 0;

  constructor(private homeService: HomeService, private photoService: PhotoService){}

  // to see which screen should be displayed
  ngOnInit(){
    this.homeService.getComponent().subscribe((screen) =>{
      this.screen = screen;
    }
    )
    this.photoService.getImages().then((images) => (this.images = images));
        this.responsiveOptions = [
            {
                breakpoint: '1024px',
                numVisible: 5
            },
            {
                breakpoint: '768px',
                numVisible: 3
            },
            {
                breakpoint: '560px',
                numVisible: 1
            }
        ];
  }
  showSignUpWindow = false;
  toggleSignUpWindow() {
    this.showSignUpWindow = true;
  }

  changeScreen(screen: number){
    this.homeService.changeComponent(screen);
  }

  redirectToDoc() {
    const link = 'https://github.com/boucher-broderick/SSD_Sesame_Street';
    window.location.href = link;
  }
}
