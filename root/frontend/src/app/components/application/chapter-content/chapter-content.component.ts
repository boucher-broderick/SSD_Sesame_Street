import { Component, ContentChildrenDecorator, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContentService } from './content.service';
import { Content } from 'src/app/models/content';

@Component({
  selector: 'app-chapter-content',
  templateUrl: './chapter-content.component.html',
  styleUrls: ['./chapter-content.component.css']
})

export class ChapterContentComponent {

    contentId!: string;
    projectId!: string;
    chapterId!: string;
    loading: boolean = false;
    text: string = "";
    constructor(private _router:Router, private contentService: ContentService){}

    ngOnInit(){
        const TOOLBAR_OPTION = [
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                [{ font: [] }],
                [{ list: "ordered" }, { list: "bullet" }],
                ["bold", "italic", "underline"],
                [{ color: [] }, { background: [] }],
                [{ script: "sub" }, { script: "super" }],
                [{ align: [] }],
                ["image", "blockquote", "code-block"],
                ["clean"],
                ];

        var id1 = sessionStorage.getItem("projectId");
        if(id1) this.projectId= id1.replace(/['"]+/g, '')
        else this.projectId = '';
        var id2 = sessionStorage.getItem("chapterId");
        if(id2) this.chapterId= id2.replace(/['"]+/g, '')
        else this.chapterId = '';

        this.getContent();
    }

    private getContent(){
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

