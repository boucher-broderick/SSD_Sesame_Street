import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  testPage : boolean = true;

  title = 'frontend';

  constructor() { }

  public onChangePage() {
    this.testPage = !this.testPage;
  }
  
}
