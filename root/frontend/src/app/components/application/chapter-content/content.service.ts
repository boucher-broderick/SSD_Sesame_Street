import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

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
              content: content.content,
              links: content.links,
              images: content.images,
              videos: content.videos
            };
          });
        }
        else return null;
      }));
  }

  editContent(contentId: string, projectId: string, chapterId: string, content:string, links:string, images:string, videos:string): Observable<any>{
    projectId = projectId.replace(/['"]+/g, '');
    console.log('projectId:', projectId);
    chapterId = chapterId.replace(/['"]+/g, '');
    console.log('chapterId:', chapterId);
    contentId = contentId.replace(/['"]+/g, '');
    console.log('contentId:', contentId);

    return this.http.put<{message: string}>('http://localhost:5001/api/content/editContent', {contentId: contentId, projectId: projectId, chapterId: chapterId, content: content, links: links, images: images, videos: videos}).pipe(
      map((response: any) => {
        if(response.status == 200){
          return {
            chapterId: response.content.chapterId,
            projectId: response.content.projectId,
            content: response.content.content,
            links: response.content.links,
            images: response.content.images,
            videos: response.content.videos,
          };
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
}
