import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChapterContentComponent } from './chapter-content.component';
import { Router } from '@angular/router';
import { ContentService } from './content.service';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

describe('ChapterContentComponent', () => {
  let component: ChapterContentComponent;
  let fixture: ComponentFixture<ChapterContentComponent>;
  let contentServiceMock: any;
  let routerMock: any;

  beforeEach(() => {
    contentServiceMock = jasmine.createSpyObj('ContentService', ['getChapters', 'getContent', 'editContent']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [ChapterContentComponent],
      providers: [
        { provide: ContentService, useValue: contentServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: MessageService, useValue: {} } // Assuming MessageService is used as is
      ]
    });
    fixture = TestBed.createComponent(ChapterContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize and load content', () => {
    // Mock responses for contentService
    contentServiceMock.getChapters.and.returnValue(of([/* Mocked chapters data */]));
    contentServiceMock.getContent.and.returnValue(of([/* Mocked content data */]));

    component.ngOnInit();

    // Assertions to ensure data is loaded
    expect(contentServiceMock.getChapters).toHaveBeenCalled();
    expect(contentServiceMock.getContent).toHaveBeenCalled();
  });

  it('should detect content changes', () => {
    component.onTextChange();
    expect(component.unsavedChanges).toBeTrue();
  });

  it('should save content', () => {
    // Mock save response
    contentServiceMock.editContent.and.returnValue(of({/* Mocked save response */}));

    component.onSave();

    // Verify that editContent was called
    expect(contentServiceMock.editContent).toHaveBeenCalled();
    // Optional: Check if unsavedChanges flag is reset
    expect(component.unsavedChanges).toBeFalse();
  });

  it('should navigate to chapters', () => {
    component.redirectToChapters();
    expect(routerMock.navigate).toHaveBeenCalledWith(['application/chapters']);
  });

  // Similar tests for redirectToProjects, redirectToHome, redirectToSettings

  it('should handle loading animation', () => {
    component.load();
    expect(component.loading).toBeTrue();

    // Simulate timeout
    setTimeout(() => {
      expect(component.loading).toBeFalse();
    }, 1000);
  });

  // ... other tests as required
});
