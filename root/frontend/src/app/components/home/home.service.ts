import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private logInSubject = new BehaviorSubject<number>(0);

  constructor() { }

  changeComponent(component: number) {
    this.logInSubject.next(component);
  }

  getComponent() {
    return this.logInSubject.asObservable();
  }
  
}
