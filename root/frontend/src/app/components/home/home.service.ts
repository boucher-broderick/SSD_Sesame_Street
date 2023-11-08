import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private logInSubject = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) { }

  changeComponent(component: number) {
    this.logInSubject.next(component);
  }

  getComponent() {
    return this.logInSubject.asObservable();
  }

  onAddUser(user: User): Observable<any>{
    return this.http.post<{message: string}>('http://localhost:5001/api/users/register', user).pipe(
      map((response: any) => {
        return response;
      }));
    }


    onSignIn(user: any): Observable<any>{
      return this.http.post<{message: string}>('http://localhost:5001/api/users/login', user).pipe(
        map((response: any) => {
          return response;
        }));
      }
  
  
  
  
}
