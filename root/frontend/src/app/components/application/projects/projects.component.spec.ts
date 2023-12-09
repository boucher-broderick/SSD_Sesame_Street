import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectsComponent } from './projects.component';
import { Router } from '@angular/router';
import { ProjectsService } from './projects.service';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { Project } from 'src/app/models/project';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;
  let projectsServiceMock: any;
  let routerMock: any;
  let messageServiceMock: any;

  beforeEach(() => {
    projectsServiceMock = jasmine.createSpyObj('ProjectsService', ['getProjects', 'newProject', 'editProject', 'deleteProject']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);
    messageServiceMock = jasmine.createSpyObj('MessageService', ['add']);

    TestBed.configureTestingModule({
      declarations: [ProjectsComponent],
      providers: [
        { provide: ProjectsService, useValue: projectsServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: MessageService, useValue: messageServiceMock }
      ]
    });
    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

// Define mock projects
const mockProjects: Project[] = [
  {
    projectId: 'p1',
    userId: 'user1',
    name: 'Project One',
    author: 'Author One',
    created: new Date('2023-01-01'),
    description: 'Description of Project One'
  },
  {
    projectId: 'p2',
    userId: 'user2',
    name: 'Project Two',
    author: 'Author Two',
    created: new Date('2023-02-01'),
    description: 'Description of Project Two'
  },
  // Add more mock projects as needed
];

const mockProject: Project = {
  projectId: 'p3',
  userId: 'user3',
  name: 'Project Three',
  author: 'Author Three',
  created: new Date('2023-03-01'),
  description: 'Description of Project Three'
};

// Now, use these mock objects in your tests

// ... inside your test suite

it('should initialize and load projects', () => {
  projectsServiceMock.getProjects.and.returnValue(of(mockProjects));
  component.ngOnInit();
  expect(component.projects.length).toBeGreaterThan(0);
  expect(component.projects).toEqual(mockProjects);
});

it('should create a new project', () => {
  // Here, you can check if a new, empty project is created
  // Simulating the 'createProject()' behavior as per your component logic
  component.createProject();
  expect(component.newProject).toBeTrue();
  expect(component.projects.length).toBeGreaterThan(0);
  // Check if the new project has default values set correctly
});

it('should initialize row editing', () => {
  component.onRowEditInit(mockProject);
  expect(component.editing).toBeTrue();
  expect(component.selectedProject).toEqual(mockProject);
});

it('should cancel row editing', () => {
  component.onRowEditCancel(mockProject, 2); // Assuming 2 is the index
  expect(component.editing).toBeFalse();
  // You can also check if the 'clonedProject' object is handled correctly
});

it('should delete a project', () => {
  component.selectedProject = mockProject;
  projectsServiceMock.deleteProject.and.returnValue(of({/* Mocked response */}));
  component.deleteProject();
  expect(projectsServiceMock.deleteProject).toHaveBeenCalledWith(mockProject.projectId);
  // You can also check if the project list is updated correctly after deletion
});

// ... other tests


});
