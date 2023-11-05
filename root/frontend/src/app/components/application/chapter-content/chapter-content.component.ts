import { Component } from '@angular/core';
import { Router } from '@angular/router';
//import Quill from 'Quill';

@Component({
  selector: 'app-chapter-content',
  templateUrl: './chapter-content.component.html',
  styleUrls: ['./chapter-content.component.css']
})

export class ChapterContentComponent {

    loading: boolean = false;
    text: string = "";
    constructor(private _router:Router){}

    ngOnInit(){
        var item = sessionStorage.getItem("user");
        if(item !="0"){
            this.text = `The ancient forest of Eldoria was a realm of whispered legends, a tapestry of greenery woven with the enchantments of the old world. Its trees stood sentinel-like, their venerable boughs swaying to the silent music of the arcane, their roots delving deep into the bedrock of myth. Here, the air thrummed with a magic so potent it cast a shimmering haze upon the woodland floor, and every dewdrop glinted with the light of stars that had witnessed the birth of time.

            In the heart of this eternal thicket, a brook babbled its way over pebbles and under arches of twisted roots, telling tales of yore to any who would listen. It was along this merry brook that Aeliana, the last Moonweaver of the Fae'lyn, tread softly. Her eyes, the color of twilight, held the wisdom of centuries, and her silken wings, translucent and moonlit, fluttered gently in the wake of her path. Aeliana’s quest was one of grave peril—a search for the Crystal Chalice, a relic of unfathomable power, lost to the throes of time and the ashes of the Last Great War.
            
            The day waned, casting a golden hue upon the leaves, turning them into a mosaic of fire and light. As Aeliana approached the ruins of Eldoria's heart, where once the Fae'lyn court had thrived, her senses prickled. From the shadows cast by the twilight, a figure emerged—a knight, his armor an alabaster shade that glowed softly in the failing light. Sir Caelum, the Warden of the Forgotten Vale, stood before her, a silent oath to guard the remains of what was once a beacon of hope.
            
            Their meeting was not by chance, for destiny had intertwined their fates long ago, binding them to the soul of Eldoria. "The stars are aligned, Moonweaver," Sir Caelum’s voice was like a whisper of the wind through autumn leaves, "and the Chalice awakens. Darkness stirs in the bones of these woods, and it seeks to shroud the world in night everlasting."
            
            Aeliana nodded, her resolve hardening like the diamond heart of the forest itself. Together, they would venture into the forgotten depths, beyond the veil of reality and into the dreamscape of Eldoria's hidden chamber. Here, where the Chalice slumbered, their true test would begin—against the creeping tendrils of oblivion and the ancient evil that sought to claim the Chalice's power for its own nefarious will.
            
            As the first stars of evening pierced the veil of dusk, Aeliana and Sir Caelum stepped through the ruins, their shadows merging with the twilight. Their journey, woven of hope and courage, would become a tale for the ages, sung by the brook and carried by the wind—a story to stir the hearts of those who believe in the magic that dwells in the unseen corners of the world.`;
        }
    }

    redirectToChapters(){
        this._router.navigate(['application/chapters']);
      }

    redirectToProjects(){
    this._router.navigate(['application/']);
    }

    
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

// // text-editor
// let options = {
//   modules: {
//     toolbar: '#toolbar'
//   },
//   placeholder: 'Write something...',
//   theme: 'snow'
// };
// let editor = new Quill('#editor', options);
