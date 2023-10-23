import { Component } from '@angular/core';
import { Project } from 'src/app/models/project';
import { TableColumns } from 'src/app/models/table-columns';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent{

  projects!: Project[];
  columns!: TableColumns[];


  constructor(){ }

  ngOnInit(){
    this.getProjectDate();
  }

  
  onRowEditInit(project: Project){
    
  }

  onRowEditSave(project: Project){
    
  }

  onRowEditCancel(project: Project, index: number){
  
  }


  private getProjectDate(){
    this.projects =  [
      {
        id:1,
        name: "project1",
        author: "me",
        created: new Date(),
        description: "project1"
      }
    ];
    this.columns = this.setColumns();
  }

  private setColumns(): TableColumns[] {
    return [{
      columnName: "id",
      displayName: "id",
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
      hidden: false,
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
