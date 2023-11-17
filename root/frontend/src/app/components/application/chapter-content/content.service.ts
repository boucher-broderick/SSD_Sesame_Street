import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Project } from 'src/app/models/project';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class ContentService {


  constructor(private http: HttpClient) { }

  getContent(projectId: string, chapterId: string): Observable<any> {
    // Create a set of HTTP parameters that includes the userI
    projectId = projectId.replace(/['"]+/g, '');
    chapterId = chapterId.replace(/['"]+/g, '');
    const params = new HttpParams()
      .set('projectId', projectId)
      .set('chapterId', chapterId);


    return this.http.get<{message: string}>('http://localhost:5001/api/content/getContent', { params }).pipe(
        
      map((response: any) => {  
        console.log(response) ;
        if(response.status == 200){
          return response.content.map((content: any) => {
            return {
              contentId: content['_id'],
              chapterId: content.chapterName,
              projectId: content.projectId,
              content: content.content
            };
          });
        }
        else return null;
      }));
  }


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

  editContent(contentId: string, projectId: string, chapterId: string, content:string): Observable<any>{
    projectId = projectId.replace(/['"]+/g, '');
    chapterId = chapterId.replace(/['"]+/g, '');
    contentId = contentId.replace(/['"]+/g, '');
    content = content.replace(/['"]+/g, '');
    return this.http.put<{message: string}>('http://localhost:5001/api/content/editContent', {contentId: contentId, projectId: projectId, chapterId: chapterId, content: content}).pipe(
      map((response: any) => {
        if(response.status == 200){
          return {
            chapterId: response.content.chapterId,
            projectId: response.content.projectId,
            content: response.content.content
          };

        }
        else return null;
      }));
  }

  

}
