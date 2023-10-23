import { Component } from '@angular/core';
import Quill from 'quill';

@Component({
  selector: 'app-chapter-content',
  templateUrl: './chapter-content.component.html',
  styleUrls: ['./chapter-content.component.css']
})

export class ChapterContentComponent {
    loading: boolean = false;

    load() {
        this.loading = true;

        setTimeout(() => {
            this.loading = false
        }, 2000);
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

// text-editor
let options = {
  modules: {
    toolbar: '#toolbar'
  },
  placeholder: 'Write something...',
  theme: 'snow'
};
let editor = new Quill('#editor', options);




