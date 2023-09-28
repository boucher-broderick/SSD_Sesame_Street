import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationComponent } from './application.component';
import { ChapterContentComponent } from './chapter-content/chapter-content.component';
import { ChaptersComponent } from './chapters/chapters.component';
import { ProjectsComponent } from './projects/projects.component';
import { SettingsComponent } from './settings/settings.component';


const routes: Routes = [

  {
    path: '',
    component: ApplicationComponent,
    children: [
      { path: '', redirectTo: 'projects', pathMatch: 'full'},
      { path: 'projects', component: ProjectsComponent },
      { path: 'chapters', component: ChaptersComponent },
      { path: 'content', component: ChapterContentComponent },
      { path: 'settings', component: SettingsComponent  }
      // No redirection here
    ]
  }

  
]

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ApplicationRoutingModule { }
