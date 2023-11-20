import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent {

constructor(private _router:Router){}

redirectToSite(){
  var id = sessionStorage.getItem("user");
  if(id){
    this._router.navigate(['application']);
  }
  else{
    this._router.navigate(['home']);
  }
}

}
