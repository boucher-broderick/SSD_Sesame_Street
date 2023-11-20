import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestComponent } from './components/test/test.component';
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/home/sign-in/sign-in.component';
import { SignUpComponent } from './components/home/sign-up/sign-up.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';


const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/home', 
    pathMatch: 'full'
  },
  { 
    path: 'Test',
    component: TestComponent 
  },
  { 
    path: 'home', 
    component: HomeComponent 
  },
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  { 
    path: 'application',  
    loadChildren: () => import('./components/application/application.module').then(m => m.ApplicationModule)
   },
   {
    path: '**', component: ErrorPageComponent
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
//commetn
