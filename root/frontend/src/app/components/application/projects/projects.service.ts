import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Project } from 'src/app/models/project';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {


  constructor(private http: HttpClient) { }

  getProjects(userId: string): Observable<any> {
    // Create a set of HTTP parameters that includes the userI
    userId = userId.replace(/['"]+/g, '');
    const params = new HttpParams().set('userId', userId);
  
    // Use the HttpParams object in the HTTP GET request
    return this.http.get<{message: string}>('http://localhost:5001/api/projects/getProjects', { params }).pipe(
      map((response: any) => {
        if(response.status == 200){
          return response.projects.map((project: any) => {
            return {
              projectId: project['_id'],
              userId: project.userId,
              name: project.name,
              author: project.author,
              created: new Date(),
              description: project.description
            };
          });
        }
        else return null;
      }));
  }


  newProject(project: any): Observable<any>{
    return this.http.post<{message: string}>('http://localhost:5001/api/projects/addProject', project).pipe(
      map((response: any) => {
        if(response.status == 200){
            return {
              projectId: response.project['_id'],
              userId: response.project.userId,
              name: response.project.name,
              author: response.project.author,
              created: new Date(),
              description: response.project.description
            };

        }
        else return null;
      }));
  }

  editProject(project: any): Observable<any>{
    return this.http.put<{message: string}>('http://localhost:5001/api/projects/editProject', project).pipe(
      map((response: any) => {
        if(response.status == 200){
            return {
              projectId: response.project['_id'],
              userId: response.project.userId,
              name: response.project.name,
              author: response.project.author,
              created: new Date(),
              description: response.project.description
            };

        }
        else return null;
      }));
  }

  
  deleteProject(projectId: string): Observable<any>{
    console.log(projectId);
    const params = new HttpParams().set('projectId', projectId);

     return this.http.delete<{message: string}>('http://localhost:5001/api/projects/deleteProject', { params }).pipe(
      map((response: any) => {
        console.log(response);
      }));
    }
  
}
