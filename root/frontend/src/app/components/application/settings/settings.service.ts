import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Project } from 'src/app/models/project';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {


  constructor(private http: HttpClient) { }

  // chanes the user info
  editUserInto(id:string, type: string, change: string): Observable<any>{
    id = id.replace(/['"]+/g, '');
    var req = {
      "id" : id,
      "type" : type,
      "change" : change
    }

    return this.http.post<{message: string}>('http://localhost:5001/api/users/update', req).pipe(
      map((response: any) => {
            return response;
      }));
  }

  
}
