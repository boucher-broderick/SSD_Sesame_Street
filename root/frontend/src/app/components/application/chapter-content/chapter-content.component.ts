import { Component, ContentChildrenDecorator } from '@angular/core';
import { Router } from '@angular/router';
import { ContentService } from './content.service';
import { Content } from 'src/app/models/content';
//import Quill from 'Quill';

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
        var id1 = sessionStorage.getItem("projectId");
        if(id1) this.projectId= id1.replace(/['"]+/g, '')
        else this.projectId = '';

        var id2 = sessionStorage.getItem("chapterId");
        if(id2) this.chapterId= id2.replace(/['"]+/g, '')
        else this.chapterId = '';
        this.getContent();
    }

    redirectToChapters(){
        this._router.navigate(['application/chapters']);
      }

    redirectToProjects(){
    this._router.navigate(['application/']);
    }

    onSave(){

        this.contentService.editProject(this.contentId, this.projectId, this.chapterId, this.text).subscribe((data)=>{
            console.log(data);
        })
    }

    
    load() {
        this.loading = true;

        setTimeout(() => {
            this.loading = false
        }, 2000);
    }

    private getContent(){
        this.contentService.getContent(this.projectId, this.chapterId).subscribe((data)=>{
            console.log(data);
            this.text = data[0].content;
            this.contentId = data[0].contentId;
        })
    }
}

// project title
// Get all project title elements
const projectTitles = document.querySelectorAll('.project-title');
// Add click event listeners to each project title
projectTitles.forEach((title) => {
    // Store the initial title
    let initialTitle = title.textContent;
    // Handle title click to enable editing
    title.addEventListener('click', () => {
        title.setAttribute('contenteditable', 'true');
    });
    // Handle click outside the input field to trigger auto-saving
    document.addEventListener('click', (event) => {
        if (title === event.target) return;
        // Get the edited title
        const newTitle = title.textContent;
        // Check if the title has changed
        if (newTitle !== initialTitle) {
            // Save the new title (you can send it to your server for storage)
            console.log(`Auto-saved new title: ${newTitle}`);
            initialTitle = newTitle;
        }
        // Disable editing after saving
        title.setAttribute('contenteditable', 'false');
    });
});

// // text-editor
// let options = {
//   modules: {
//     toolbar: '#toolbar'
//   },
//   placeholder: 'Write something...',
//   theme: 'snow'
// };
// let editor = new Quill('#editor', options);
