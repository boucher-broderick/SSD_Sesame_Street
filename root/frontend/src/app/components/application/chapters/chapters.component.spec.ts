import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChaptersComponent } from './chapters.component';
import { Router } from '@angular/router';
import { ChaptersService } from './chapters.service';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { Chapter } from 'src/app/models/chapter';

describe('ChaptersComponent', () => {
  let component: ChaptersComponent;
  let fixture: ComponentFixture<ChaptersComponent>;
  let chaptersServiceMock: any;
  let routerMock: any;
  let messageServiceMock: any;

  beforeEach(() => {
    chaptersServiceMock = jasmine.createSpyObj('ChaptersService', ['getChapters', 'newChapter', 'editProject', 'deleteChapter']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);
    messageServiceMock = jasmine.createSpyObj('MessageService', ['add']);

    TestBed.configureTestingModule({
      declarations: [ChaptersComponent],
      providers: [
        { provide: ChaptersService, useValue: chaptersServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: MessageService, useValue: messageServiceMock }
      ]
    });
    fixture = TestBed.createComponent(ChaptersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

 // ... [Previous setup code]
// Define mock chapters
const mockChapters: Chapter[] = [
  {
    chapterId: '1',
    projectId: 'proj1',
    chapterNumber: 1,
    name: 'Chapter One',
    description: 'Description of Chapter One'
  },
  {
    chapterId: '2',
    projectId: 'proj1',
    chapterNumber: 2,
    name: 'Chapter Two',
    description: 'Description of Chapter Two'
  },
  // Add more mock chapters as needed
];

const mockChapter: Chapter = {
  chapterId: '3',
  projectId: 'proj1',
  chapterNumber: 3,
  name: 'Chapter Three',
  description: 'Description of Chapter Three'
};

// Now, use these mock objects in your tests

// ... inside your test suite

it('should initialize and load chapters', () => {
  chaptersServiceMock.getChapters.and.returnValue(of(mockChapters));
  component.ngOnInit();
  expect(component.chapters.length).toBeGreaterThan(0);
  expect(component.chapters).toEqual(mockChapters);
});

it('should create a new chapter', () => {
  // Here, you can check if a new, empty chapter is created
  // Simulating the 'createChapter()' behavior as per your component logic
  component.createChapter();
  expect(component.newChapter).toBeTrue();
  expect(component.chapters.length).toBeGreaterThan(0);
  // Check if the new chapter has default values set correctly
});

it('should initialize row editing', () => {
  component.onRowEditInit(mockChapter);
  expect(component.editing).toBeTrue();
  expect(component.selectedChapter).toEqual(mockChapter);
});

it('should cancel row editing', () => {
  component.onRowEditCancel(mockChapter, 2); // Assuming 2 is the index
  expect(component.editing).toBeFalse();
  // You can also check if the 'clonedProject' object is handled correctly
});

it('should delete a chapter', () => {
  component.selectedChapter = mockChapter;
  chaptersServiceMock.deleteChapter.and.returnValue(of({/* Mocked response */}));
  component.deleteChapter();
  expect(chaptersServiceMock.deleteChapter).toHaveBeenCalledWith(mockChapter.chapterId);
  // You can also check if the chapter list is updated correctly after deletion
});


});
