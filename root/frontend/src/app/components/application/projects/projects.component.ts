import { Component } from '@angular/core';
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
  editing: boolean = false;
  newProject: boolean = false;

  constructor() { }

  ngOnInit() {
    this.getProjectDate();
  }

  createProject() {
    this.newProject = true;
    var temp: Project = {
      id: 5,
      name: "project",
      author: "me",
      created: new Date(),
      description: "project"
    }
    this.projects = [temp, ...this.projects];

  }

  onRowEditInit(project: Project) {

  }

  onRowEditSave(project: Project) {

  }

  onRowEditCancel(project: Project, index: number) {

  }


  onSelect(selected: Project) {
    if (this.selectedProject.id != selected.id) {
      this.selectedProject = selected;
    }
  }

  private getProjectDate() {
    this.projects = [
      {
        id: 1,
        name: "project1",
        author: "me",
        created: new Date(),
        description: "project1"
      },
      {
        id: 2,
        name: "project2",
        author: "me",
        created: new Date(),
        description: "project2"
      },
      {
        id: 3,
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
