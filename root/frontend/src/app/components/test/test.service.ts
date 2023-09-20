import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { map, Observable, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor( private http: HttpClient ) { }

  onAddUser(user: User){
    this.http.post<{message: string}>('http://localhost:5001/api/example', user).subscribe((jsonData) => {
      console.log(user);
    })
  }

  getUser(): Observable<any>{
  return this.http.get('http://localhost:5001/api/example')
      .pipe(
        map((response: any) => {
          // Assuming the response is an object with a 'users' property
          // and 'users' is an array of user objects
          return response.map((user: any) => {
            return {
              name: user.name,
              age: user.age
            };
          });
        })
      );
}

}
