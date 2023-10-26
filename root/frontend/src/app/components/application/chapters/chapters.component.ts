import { Component, ViewChild,  } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Chapter } from 'src/app/models/chapter';
import { TableColumns } from 'src/app/models/table-columns';

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.css']
})
export class ChaptersComponent {

  chapters!: Chapter[];
  columns!: TableColumns[];
  selectedChapter!: Chapter;
  public clonedProject: { [id: number]: Chapter } = {};
  editing: boolean = false;
  newChapter: boolean = false;


  @ViewChild(Table) private table!: Table;

  constructor(private _router:Router) { }

  ngOnInit() {
    this.getChaptersData();
  }

  createChapter() {
    this.newChapter = true;
    var temp: Chapter = {
      id: this.getNextId(),
      name: "chapter",
      author: "me",
      description: "chapter"
    }
    this.chapters = [temp, ...this.chapters];
    this.selectedChapter = this.chapters[0];
    this.table.initRowEdit(this.chapters[0]);
    this.onRowEditInit(this.chapters[0]);

  }

  onRowEditInit(chapter: Chapter) {
    this.selectedChapter = chapter;
    this.editing = true;
    this.clonedProject[chapter.id]= {...chapter};
  }

  onRowEditSave(chapter: Chapter) {
    if(this.newChapter){
      // create new call to api
    }
    else{
      // save chapter call to api
    }
    this.chapters.sort( (a, b) => a.id - b.id);
    this.newChapter = false;
    this.editing = false;
  }

  onRowEditCancel(chapter: Chapter, index: number) {
    if(this.newChapter){
      this.chapters = this.chapters.filter( (data) => data.id != chapter.id)
      if(this.chapters.length > 0){
        this.selectedChapter = this.chapters[0];
      }
      else{
  
      }
    }
    else{
      this.chapters[index] = this.clonedProject[chapter.id];
    }
    delete this.clonedProject[chapter.id];
    this.newChapter= false;
    this.editing = false;
  }

  onSelect(selected: Chapter) {
    if (this.selectedChapter.id != selected.id && this.editing == false) {
      this.selectedChapter = selected;
    }
  }

  deleteProject(){
    this.chapters = this.chapters.filter( (data) => data.id != this.selectedChapter.id);
    if(this.chapters.length > 0){
      this.selectedChapter = this.chapters[0];
      this.onRowReorder();
    }
    else{

    }
    this.editing = false;
    this.newChapter = false;
  }

  redirectToContent(){
    this._router.navigate(['application/content']);
  }

  redirectToProjects(){
    this._router.navigate(['application/projects']);

  }

  onRowReorder(){
    var num : number = 1;
    this.chapters.forEach( (chapter) => chapter.id = num++);
    // call save function from api
  }

  private getChaptersData() {
    this.chapters = [
      {
        id: 1,
        name: "Return of God",
        author: "me",
        description: "God Returns"
      },
      {
        id: 2,
        name: "Evil God",
        author: "me",
        description: "What the god is bad"
      },
      {
        id: 3,
        name: "Nice God",
        author: "me",
        description: "Nevermind he good"
      },
    ];
    this.selectedChapter = this.chapters[0];
    this.columns = this.setColumns();
  }

  private setColumns(): TableColumns[] {
    return [{
      columnName: "id",
      displayName: "Chapter No",
      hidden: false,
      readonly: true
    },
    {
      columnName: "name",
      displayName: "Chapter Name",
      hidden: false,
      readonly: false
    },
    {
      columnName: "author",
      displayName: "Author",
      hidden: true,
      readonly: true
    },
    {
      columnName: "created",
      displayName: "Date Created",
      hidden: true,
      readonly: true
    },
    {
      columnName: "description",
      displayName: "Description",
      hidden: false,
      readonly: false
    },
    ]
  }

  private getNextId(){
    var highest: number = 0;
    if(this.chapters){
      this.chapters.forEach( (chapter ) =>{
        if(chapter.id > highest){
          highest = chapter.id;
        }
      });
    }
    return (highest+1);
  }


}
