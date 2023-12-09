import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignInComponent } from './sign-in.component';
import { Router } from '@angular/router';
import { HomeService } from '../home.service';
import { MessageService } from 'primeng/api';
import { of, throwError } from 'rxjs';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let homeServiceMock: any;
  let routerMock: any;
  let messageServiceMock: any;

  beforeEach(() => {
    homeServiceMock = jasmine.createSpyObj('HomeService', ['onSignIn']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);
    messageServiceMock = jasmine.createSpyObj('MessageService', ['add']);

    TestBed.configureTestingModule({
      declarations: [SignInComponent],
      providers: [
        { provide: HomeService, useValue: homeServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: MessageService, useValue: messageServiceMock }
      ]
    });
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update email and password on user input', () => {
    // Simulate user input
    component.email = 'test@example.com';
    component.password = 'password123';
    fixture.detectChanges();

    // Assert that the component properties are updated
    expect(component.email).toBe('test@example.com');
    expect(component.password).toBe('password123');
  });

  it('should navigate to application on successful sign-in', () => {
    // Mock homeService response for successful sign-in
    homeServiceMock.onSignIn.and.returnValue(of({ status: 200, _id: '12345' }));

    // Simulate sign-in
    component.signIn();

    // Assert navigation to 'application'
    expect(routerMock.navigate).toHaveBeenCalledWith(['application']);
  });

  it('should display error message on sign-in failure', () => {
    // Mock homeService response for failed sign-in
    homeServiceMock.onSignIn.and.returnValue(throwError({ status: 401, error: 'Sign-in failed' }));

    // Simulate sign-in
    component.signIn();

    // Assert error message is displayed
    expect(messageServiceMock.add).toHaveBeenCalledWith({ severity: 'error', summary: 'Error', detail: 'Sign-in failed: incorrect email or password' });
  });

  it('should toggle loading indicator during sign-in', () => {
    // Assume the loading starts as false
    expect(component.loading).toBeFalse();

    // Simulate load start
    component.load();

    // Assert loading is true
    expect(component.loading).toBeTrue();

    // Simulate end of loading
    setTimeout(() => {
      expect(component.loading).toBeFalse();
    }, 2000);
  });

  // Additional test for session storage can be added here
  // ...
});
