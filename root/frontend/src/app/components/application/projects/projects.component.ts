import { Component, ViewChild,  } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Project } from 'src/app/models/project';
import { TableColumns } from 'src/app/models/table-columns';
import { ProjectsService } from './projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  userId!:string;
  projects: Project[]=[];
  columns!: TableColumns[];
  selectedProject!: Project;
  public clonedProject: { [projectId: string]: Project } = {};
  editing: boolean = false;
  newProject: boolean = false;


  @ViewChild(Table) private table!: Table;

  constructor(private _router:Router, private projectsService: ProjectsService) { }

  ngOnInit() {
    var id = sessionStorage.getItem("user");
    if(id) this.userId= id.replace(/['"]+/g, '')
    else this.userId = '';
    this.getProjectDate();
  }

  createProject() {
    this.newProject = true;

    var temp: Project = {
      userId: this.userId,
      projectId: "",
      name: "project",
      author: "me",
      created: new Date(),
      description: "project"
    }
    this.projects = [temp, ...this.projects];
    this.selectedProject = this.projects[0];
    this.table.initRowEdit(this.projects[0]);
    this.onRowEditInit(this.projects[0]);

  }

  onRowEditInit(project: Project) {
    this.selectedProject = project;
    this.editing = true;
    this.clonedProject[project.projectId]= {...project};
  }

  onRowEditSave(project: Project) {
    var body = {
      userId: project.userId,
      name: project.name,
      author: project.author,
      description: project.description
    };
    if(this.newProject){
      this.projectsService.newProject(body).subscribe((data)=>{
        if(data!= null){
          project = data;
          this.projects[0] = data;
          this.selectedProject = this.projects[0];
          const stringValue = JSON.stringify(this.selectedProject.projectId);
          sessionStorage.setItem("projectId", stringValue);
        }
      })
    }
    else{
      this.projectsService.editProject(project).subscribe((data)=>{
        if(data!= null){
          project = data;
        }
      })
    }
    this.newProject = false;
    this.editing = false;
  }

  onRowEditCancel(project: Project, index: number) {
    if(this.newProject){
      this.projects = this.projects.filter( (data) => data.projectId != project.projectId)
      if(this.projects.length > 0){
        this.selectedProject = this.projects[0];
      }
      else{
        
      }
    }
    else{
      this.projects[index] = this.clonedProject[project.projectId];
    }
    delete this.clonedProject[project.projectId];
    this.newProject = false;
    this.editing = false;
  }

  onSelect(selected: Project) {
    if (this.selectedProject.projectId != selected.projectId && this.editing == false) {
      this.selectedProject = selected;
      const stringValue = JSON.stringify(selected.projectId);
      sessionStorage.setItem("projectId", stringValue);
    }
  }

  deleteProject(){
    if(this.editing == false){
      this.projectsService.deleteProject(this.selectedProject.projectId).subscribe((data)=>{
        console.log(data);
      })
    }
    this.projects = this.projects.filter( (data) => data.projectId != this.selectedProject.projectId);
    if(this.projects.length > 0){
      this.selectedProject = this.projects[0];
    }
    else{

    }
    this.editing = false;
    this.newProject = false;
  }

  redirectToChapters(){
    this._router.navigate(['application/chapters']);
  }

  private getProjectDate() {
    this.columns = this.setColumns();
      this.projectsService.getProjects(this.userId).subscribe((data)=>{
        if(data){
          this.projects = data;
          console.log(this.projects);
          this.selectedProject = this.projects[0];
          const stringValue = JSON.stringify(this.selectedProject.projectId);
          sessionStorage.setItem("projectId", stringValue);
        }
      })


  }

  private setColumns(): TableColumns[] {
    return [{
      columnName: "projectId",
      displayName: "Project No",
      hidden: true,
      readonly: true
    },
    {
      columnName: "name",
      displayName: "Project Name",
      hidden: false,
      readonly: false
    },
    {
      columnName: "author",
      displayName: "Author",
      hidden: false,
      readonly: true
    },
    {
      columnName: "created",
      displayName: "Date Created",
      hidden: true,
      readonly: true
    },
    {
      columnName: "description",
      displayName: "Description",
      hidden: false,
      readonly: false
    },
    ]
  }
}
