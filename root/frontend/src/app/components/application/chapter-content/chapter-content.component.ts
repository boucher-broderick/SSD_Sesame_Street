import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ContentService } from './content.service';
import { MenuItem, MessageService } from 'primeng/api';

@Component({
  selector: 'app-chapter-content',
  templateUrl: './chapter-content.component.html',
  styleUrls: ['./chapter-content.component.css'],
  providers: [MessageService]
})

export class ChapterContentComponent {
    menuItems: MenuItem[];
    chapterName!: string;
    description!: string;
    contentId!: string;
    projectId!: string;
    chapterId!: string;
    loading: boolean = false;
    text: string = "";
    sidebarVisible: boolean = false;
    constructor(private _router:Router, private contentService: ContentService, private messageService: MessageService) {
            this.menuItems = [
            {
                label: 'Chapters list',
                icon: 'pi pi-book',
                command: () => {
                    this.redirectToChapters();
                }
            },
            {
                label: 'Projects list',
                icon: 'pi pi-folder',
                command: () => {
                    this.redirectToProjects();
                }
            },
        ];
    }

    ngOnInit(){
        let id1 = sessionStorage.getItem("projectId");
        if(id1) this.projectId= id1.replace(/['"]+/g, '')
        else this.projectId = '';
        let id2 = sessionStorage.getItem("chapterId");
        if(id2) this.chapterId= id2.replace(/['"]+/g, '')
        else this.chapterId = '';

        this.getContent();
    }

    private getContent(){
        this.contentService.getChapters(this.projectId).subscribe((data) => {
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                if (this.chapterId === data[i].chapterId) {
                    this.chapterName = "Chapter " + data[i].chapterNumber + ": " + data[i].name;
                    this.description = data[i].description;
                    break;
                }
            }
        })
        this.contentService.getContent(this.projectId, this.chapterId).subscribe((data)=>{
            console.log(data);
            this.text = data[0].content;
            this.contentId = data[0].contentId;
        })
    }

    onSave(){
        this.contentService.editContent(this.contentId, this.projectId, this.chapterId, this.text).subscribe((data)=>{
            console.log(data);
        })
        this.messageService.add({ severity: "success", summary: 'Success', detail: 'Content Saved' });
    }
    load() {
        this.loading = true;
        setTimeout(() => {
            this.loading = false
        }, 1000);
    }
    redirectToChapters(){
        this._router.navigate(['application/chapters']);
    }
    redirectToProjects(){
        this._router.navigate(['application/']);
    }
}

