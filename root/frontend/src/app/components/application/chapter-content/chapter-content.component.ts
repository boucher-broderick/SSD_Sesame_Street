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
    chapterNumber!: string;
    description!: string;
    contentId!: string;
    projectId!: string;
    chapterId!: string;
    loading: boolean = false;
    text: string = "";
    links: string = "";
    images: string = "";
    videos: string = "";
    sidebarVisible: boolean = false;
    unsavedChanges: boolean = false;


    constructor(private _router: Router, private contentService: ContentService, private messageService: MessageService) {
        this.menuItems = [
            {
                label: 'Chapters list', icon: 'pi pi-book',
                command: () => {
                    this.redirectToChapters();
                }
            },
            {
                label: 'Projects list', icon: 'pi pi-folder',
                command: () => {
                    this.redirectToProjects();
                }
            },
        ];
    }

    // gets the ids from the session storage
    ngOnInit() {
        let id1 = sessionStorage.getItem("projectId");
        if (id1) this.projectId = id1.replace(/['"]+/g, '')
        else this.projectId = '';
        let id2 = sessionStorage.getItem("chapterId");
        if (id2) this.chapterId = id2.replace(/['"]+/g, '')
        else this.chapterId = '';

        this.getContent();
    }

    // gets the content from the database
    private getContent() {
        this.contentService.getChapters(this.projectId).subscribe((data) => {
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                if (this.chapterId === data[i].chapterId) {
                    this.chapterName = data[i].name;
                    this.chapterNumber = "Chapter " + data[i].chapterNumber + ": ";
                    this.description = data[i].description;
                    break;
                }
            }
        })
        this.contentService.getContent(this.projectId, this.chapterId).subscribe((data) => {
            console.log(data);
            this.contentId = data[0].contentId;
            this.text = data[0].content;
            this.links = data[0].links;
            this.images = data[0].images;
            this.videos = data[0].videos;
        })
    }

    onTextChange() {
        console.log('Text changed: ' + this.text);
        this.unsavedChanges = true;
    }

    onLinksChange() {
        console.log('Links changed: ' + this.links);
        this.unsavedChanges = true;
    }

    // saves the content in the database
    onSave() {
        this.contentService.editContent(this.contentId, this.projectId, this.chapterId, this.text, this.links, this.images, this.videos).subscribe((data) => {
            console.log(data);
        })
        this.unsavedChanges = false;
        this.messageService.add({severity: "success", summary: 'Success', detail: 'Content is saved successfully'});
    }

    // deals with the loading animation
    load() {
        this.loading = true;
        setTimeout(() => {
            this.loading = false
        }, 1000);
    }

    // change screens
    redirectToChapters() {
        this._router.navigate(['application/chapters']);
    }

    redirectToProjects() {
        this._router.navigate(['application/']);
    }

    redirectToHome() {
        sessionStorage.clear();
        this._router.navigate(['home']);
    }

    redirectToSettings() {
        this._router.navigate(['application/settings']);
    }
}
