import { Component } from '@angular/core';
import { TestService } from './test.service';
import { User } from 'src/app/models/user';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: []
})
export class TestComponent {
  test_array !: {name: string, age: string}[];
  temp_name: string = "";
  temp_age: string = "";

  constructor(private testServer: TestService, private http: HttpClient) {

  }

  ngOnInit() {
    this.testServer.getUser().subscribe((data:any) => {
      this.test_array = data;
    });
  }

  add(){
    this.test_array = [...this.test_array, {name: this.temp_name, age: this.temp_age}];
    var user : User = {name: this.temp_name, age: this.temp_age};
    
    this.testServer.onAddUser(user);

    this.temp_name = "";
    this.temp_age = "";
  }
}
