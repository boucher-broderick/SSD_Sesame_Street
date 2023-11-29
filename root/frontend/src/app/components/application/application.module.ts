import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { SettingsComponent } from './settings/settings.component';
import { ProjectsComponent } from './projects/projects.component';
import { ChaptersComponent } from './chapters/chapters.component';
import { ChapterContentComponent } from './chapter-content/chapter-content.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ApplicationComponent } from './application.component';
import { ApplicationRoutingModule } from './application-routing.module';
import { RouterModule } from '@angular/router';
import { PrimengModule } from 'src/app/shared/modules/primeng/primeng.module';
import { SidebarModule } from 'primeng/sidebar';
import { PanelModule } from 'primeng/panel';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToastModule } from "primeng/toast";
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { EditorModule } from "primeng/editor";

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
        PrimengModule,
        SidebarModule,
        PanelModule,
        OverlayPanelModule,
        SplitButtonModule,
        ToastModule,
        InputTextModule,
        InputTextareaModule,
        NgOptimizedImage,
        EditorModule
    ]
})
export class ApplicationModule { }
