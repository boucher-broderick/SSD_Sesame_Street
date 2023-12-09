import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpComponent } from './sign-up.component';
import { Router } from '@angular/router';
import { HomeService } from '../home.service';
import { MessageService } from 'primeng/api';
import { of, throwError } from 'rxjs';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let homeServiceMock: any;
  let routerMock: any;
  let messageServiceMock: any;

  beforeEach(() => {
    homeServiceMock = jasmine.createSpyObj('HomeService', ['onAddUser']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);
    messageServiceMock = jasmine.createSpyObj('MessageService', ['add']);

    TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      providers: [
        { provide: HomeService, useValue: homeServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: MessageService, useValue: messageServiceMock }
      ]
    });
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update user data on input', () => {
    // Simulate user input
    component.username = 'testuser';
    component.email = 'test@example.com';
    component.password = 'password123';
    component.retypePassword = 'password123';
    fixture.detectChanges();

    // Assert that the component properties are updated
    expect(component.username).toBe('testuser');
    expect(component.email).toBe('test@example.com');
    expect(component.password).toBe('password123');
    expect(component.retypePassword).toBe('password123');
  });

  it('should navigate to application on successful sign-up', () => {
    // Mock homeService response for successful sign-up
    homeServiceMock.onAddUser.and.returnValue(of({ status: 201, _id: '12345' }));

    // Simulate sign-up
    component.signUp();

    // Assert navigation to 'application'
    expect(routerMock.navigate).toHaveBeenCalledWith(['application']);
  });

  it('should display error message for non-matching passwords', () => {
    // Set non-matching passwords
    component.password = 'password123';
    component.retypePassword = 'differentpassword';

    // Simulate sign-up
    component.signUp();

    // Assert error message for non-matching passwords
    expect(messageServiceMock.add).toHaveBeenCalledWith({ severity: 'error', summary: 'Error', detail: 'Re-typed password is not the same as the first password' });
  });

  it('should display error message on sign-up failure due to registered email', () => {
    // Mock homeService response for failed sign-up
    homeServiceMock.onAddUser.and.returnValue(throwError({ status: 409, error: 'Email already registered' }));

    // Simulate sign-up
    component.signUp();

    // Assert error message for registered email
    expect(messageServiceMock.add).toHaveBeenCalledWith({ severity: 'error', summary: 'Error', detail: 'This email is already registered by an user' });
  });

  // Additional test for session storage can be added here
  // ...
});
