import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings/settings.component';
import { ProjectsComponent } from './projects/projects.component';
import { ChaptersComponent } from './chapters/chapters.component';
import { ChapterContentComponent } from './chapter-content/chapter-content.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ApplicationComponent } from './application.component';
import { ApplicationRoutingModule } from './application-routing.module';
import { RouterModule } from '@angular/router';
import { PrimengModule } from 'src/app/shared/modules/primeng/primeng.module';



@NgModule({
  declarations: [

    SettingsComponent,
    ProjectsComponent,
    ChaptersComponent,
    ChapterContentComponent,
    NavbarComponent,
    ApplicationComponent
  ],
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    RouterModule,
    PrimengModule
    
  ]
})
export class ApplicationModule { }
