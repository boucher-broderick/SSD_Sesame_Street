import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Project } from 'src/app/models/project';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class ChaptersService {


  constructor(private http: HttpClient) { }

  getChapters(projectId: string): Observable<any> {
    // Create a set of HTTP parameters that includes the userI
    projectId = projectId.replace(/['"]+/g, '');
    const params = new HttpParams().set('projectId', projectId);
    console.log(projectId);
    // Use the HttpParams object in the HTTP GET request
    return this.http.get<{message: string}>('http://localhost:5001/api/chapters/getChapters', { params }).pipe(
      map((response: any) => {
        if(response.status == 200){
          return response.chapters.map((chapter: any) => {
            return {
              chapterId: chapter['_id'],
              projectId: chapter.projectId,
              chapterNumber: parseInt(chapter.chapterNumber),
              name: chapter.name,
              description: chapter.description,
            };
          });
        }
        else return null;
      }));
  }


  newChapter(chapter: any): Observable<any>{
    return this.http.post<{message: string}>('http://localhost:5001/api/chapters/addChapter', chapter).pipe(
      map((response: any) => {
        if(response.status == 200){
            return {
              chapterId: response.chapter['_id'],
              projectId: response.chapter.projectId,
              chapterNumber: parseInt(response.chapter.chapterNumber),
              name: response.chapter.name,
              description: response.chapter.description,
            };

        }
        else return null;
      }));
  }

  editProject(chapter: any): Observable<any>{
    return this.http.put<{message: string}>('http://localhost:5001/api/chapters/editChapter', chapter).pipe(
      map((response: any) => {
        if(response.status == 200){
          return {
            chapterId: response.chapter['_id'],
            projectId: response.chapter.projectId,
            chapterNumber: parseInt(response.chapter.chapterNumber),
            name: response.chapter.name,
            description: response.chapter.description,
          };

        }
        else return null;
      }));
  }

  
  deleteChapter(chapterId: string): Observable<any>{
    console.log(chapterId);
    const params = new HttpParams().set('chapterId', chapterId);

     return this.http.delete<{message: string}>('http://localhost:5001/api/chapters/deleteChapter', { params }).pipe(
      map((response: any) => {
        console.log(response);
      }));
    }
  
}
