import { Component, ViewChild,  } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Chapter } from 'src/app/models/chapter';
import { TableColumns } from 'src/app/models/table-columns';
import { ChaptersService } from './chapters.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.css'],
  providers: [MessageService]
})
export class ChaptersComponent {

  chapters!: Chapter[];
  columns!: TableColumns[];
  selectedChapter!: Chapter;
  public clonedProject: { [chapterId: string]: Chapter } = {};
  editing: boolean = false;
  newChapter: boolean = false;
  projectId!: string;

  @ViewChild(Table) private table!: Table;

  constructor(private _router:Router, private chaptersService: ChaptersService, private messageService: MessageService) { }

  // gets ids from session
  ngOnInit() {
    var id = sessionStorage.getItem("projectId");
    if(id) this.projectId= id.replace(/['"]+/g, '')
    else this.projectId = '';
    this.getChaptersData();
  }

  // creates a new chapter in the frontend
  createChapter() {
    this.newChapter = true;
    var temp: Chapter = {
      chapterId: "",
      projectId: this.projectId,
      chapterNumber: this.getNextNumber(),
      name: "chapter",
      description: "chapter"
    }
    this.chapters = [temp, ...this.chapters];
    this.selectedChapter = this.chapters[0];
    this.table.initRowEdit(this.chapters[0]);
    this.onRowEditInit(this.chapters[0]);
  }

  // when the user edits a row
  onRowEditInit(chapter: Chapter) {
    this.selectedChapter = chapter;
    this.editing = true;
    this.clonedProject[chapter.chapterId]= {...chapter};
  }

  // when a user saves an edited row or new row
  onRowEditSave(chapter: Chapter) {
    if(this.newChapter){
      var body = {
        projectId: chapter.projectId,
        chapterNumber: chapter.chapterNumber,
        name: chapter.name,
        description: chapter.description
      };
      this.chaptersService.newChapter(body).subscribe((data)=>{
        console.log(data);
        if(data!= null){
          this.chapters[0] = data;
          this.selectedChapter = this.chapters[0];
          this.chapters.sort( (a:any, b:any) => a.chapterNumber - b.chapterNumber);  
          const stringValue = JSON.stringify(this.selectedChapter.chapterId);
          sessionStorage.setItem("chapterId", stringValue);
        }
      })
    }
    else{
      this.chaptersService.editProject(chapter).subscribe((data)=>{
        if(data!= null){
          chapter = data;
        }
      })
    }
    delete this.clonedProject[chapter.chapterId];
    this.newChapter = false;
    this.editing = false;
  }

  // when the user cancels the editing of a row
  onRowEditCancel(chapter: Chapter, index: number) {
    if(this.newChapter){
      this.chapters = this.chapters.filter( (data) => data.chapterId != chapter.chapterId)
      if(this.chapters.length > 0){
        this.selectedChapter = this.chapters[0];
      }
      else{
  
      }
    }
    else{
      this.chapters[index] = this.clonedProject[chapter.chapterId];
    }
    delete this.clonedProject[chapter.chapterId];
    this.newChapter= false;
    this.editing = false;
  }

  // when the user selects a new chapter
  onSelect(selected: Chapter) {
    if (this.selectedChapter.chapterId != selected.chapterId && this.editing == false) {
      this.selectedChapter = selected;
      const stringValue = JSON.stringify(selected.chapterId);
      sessionStorage.setItem("chapterId", stringValue);
    }
  }

  // when the user deletes a chpater
   deleteChapter(){
    if(this.editing == false){
      this.chaptersService.deleteChapter(this.selectedChapter.chapterId).subscribe((data)=>{
        console.log(data);
      })
    }
    this.chapters = this.chapters.filter( (data) => data.chapterId != this.selectedChapter.chapterId);
    if(this.chapters.length > 0){
      this.selectedChapter = this.chapters[0];
      this.onRowReorder();
    }
    else{

    }
    this.editing = false;
    this.newChapter = false;
  }

  // changing screens
  redirectToContent(){
    this._router.navigate(['application/content']);
  }

  redirectToProjects(){
    this._router.navigate(['application/projects']);

  }

  //reorders and saves rows
  onRowReorder(){
    var num : number = 1;
    this.chapters.forEach( (chapter) => {
      chapter.chapterNumber = num++;
      this.chaptersService.editProject(chapter).subscribe((data)=>{
        if(data!= null){
          chapter = data;
        }
      })
    });
    // call save function from api
  }

  // gets data from database
  private getChaptersData() {
    this.chapters = [];
    this.chaptersService.getChapters(this.projectId).subscribe((data)=>{
      if(data){
        this.chapters = data;
        console.log(this.chapters);
        this.sortChapters();
        this.selectedChapter = this.chapters[0];
        const stringValue = JSON.stringify(this.selectedChapter.chapterId);
        sessionStorage.setItem("chapterId", stringValue);

      }
    })

    this.columns = this.setColumns();
  }

  // sets colomns for table
  private setColumns(): TableColumns[] {
    return [{
      columnName: "chapterNumber",
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

  // sorts chapters by chapter number
  private sortChapters(){
    this.chapters.sort((a,b)=> a.chapterNumber - b.chapterNumber);
  }

  // returns the next chapter number
  private getNextNumber(){
    var highest: number = 0;
    if(this.chapters){
      this.chapters.forEach( (chapter ) =>{
        if(chapter.chapterNumber > highest){
          highest = chapter.chapterNumber;
        }
      });
    }
    return (highest+1);
  }

  confirm_and_delete() {
    var result = confirm("Are you sure you want to delete this chapter");
    if (result) {
      this.performAction();
    } else {
    }
  }
  performAction() {
    this.deleteChapter();
    this.messageService.add({severity: "warn", summary: 'Deleted', detail: 'chapter deleted'});
  }
}
