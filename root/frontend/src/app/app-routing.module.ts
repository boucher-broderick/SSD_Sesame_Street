import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './components/test/test.component';
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';


const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/Home', 
    pathMatch: 'full'
  },
  { 
    path: 'Test',
    component: TestComponent 
  },
  { 
    path: 'Home', 
    component: HomeComponent 
  },
  {
    path: 'SignIn',
    component: SignInComponent
  },
  {
    path: 'SignUp',
    component: SignUpComponent
  },
  { path: 'Application',  loadChildren: () => import('./components/application/application.module').then(m => m.ApplicationModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
//comment
