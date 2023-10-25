import { Component, ViewChild,  } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Project } from 'src/app/models/project';
import { TableColumns } from 'src/app/models/table-columns';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {

  projects!: Project[];
  columns!: TableColumns[];
  selectedProject!: Project;
  public clonedProject: { [id: number]: Project } = {};
  editing: boolean = false;
  newProject: boolean = false;


  @ViewChild(Table) private table!: Table;

  constructor(private _router:Router) { }

  ngOnInit() {
    this.getProjectDate();
  }

  createProject() {
    this.newProject = true;
    var temp: Project = {
      id: this.getNextId(),
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
    this.clonedProject[project.id]= {...project};
  }

  onRowEditSave(project: Project) {
    if(this.newProject){
      // create new call to api
    }
    else{
      // save project call to api
    }
    this.newProject = false;
    this.editing = false;
  }

  onRowEditCancel(project: Project, index: number) {
    if(this.newProject){
      this.projects = this.projects.filter( (data) => data.id != project.id)
      if(this.projects.length > 0){
        this.selectedProject = this.projects[0];
      }
      else{
  
      }
    }
    else{
      this.projects[index] = this.clonedProject[project.id];
    }
    delete this.clonedProject[project.id];
    this.newProject = false;
    this.editing = false;
  }

  onSelect(selected: Project) {
    if (this.selectedProject.id != selected.id && this.editing == false) {
      this.selectedProject = selected;
    }
  }

  deleteProject(){
    this.projects = this.projects.filter( (data) => data.id != this.selectedProject.id);
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
    this.projects = [
      {
        id: 10,
        name: "project1",
        author: "me",
        created: new Date(),
        description: "project1"
      },
      {
        id: 20,
        name: "project2",
        author: "me",
        created: new Date(),
        description: "project2"
      },
      {
        id: 30,
        name: "project3",
        author: "me",
        created: new Date(),
        description: "project3"
      },
    ];
    this.selectedProject = this.projects[0];
    this.columns = this.setColumns();
  }

  private setColumns(): TableColumns[] {
    return [{
      columnName: "id",
      displayName: "Project No",
      hidden: false,
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

  private getNextId(){
    var highest: number = 0;
    if(this.projects){
      this.projects.forEach( (project ) =>{
        if(project.id > highest){
          highest = project.id;
        }
      });
    }
    return (highest+10);
  }
}
