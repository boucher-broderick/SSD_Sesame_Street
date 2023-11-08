import { Component, ViewChild,  } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Chapter } from 'src/app/models/chapter';
import { TableColumns } from 'src/app/models/table-columns';
import { ChaptersService } from './chapters.service';

@Component({
  selector: 'app-chapters',
  templateUrl: './chapters.component.html',
  styleUrls: ['./chapters.component.css']
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

  constructor(private _router:Router, private chaptersService: ChaptersService) { }

  ngOnInit() {
    var id = sessionStorage.getItem("projectId");
    if(id) this.projectId= id.replace(/['"]+/g, '')
    else this.projectId = '';
    this.getChaptersData();
  }

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

  onRowEditInit(chapter: Chapter) {
    this.selectedChapter = chapter;
    this.editing = true;
    this.clonedProject[chapter.chapterId]= {...chapter};
  }

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

  onSelect(selected: Chapter) {
    if (this.selectedChapter.chapterId != selected.chapterId && this.editing == false) {
      this.selectedChapter = selected;
      const stringValue = JSON.stringify(selected.chapterId);
      sessionStorage.setItem("chapterId", stringValue);
    }
  }

  deleteProject(){
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

  redirectToContent(){
    this._router.navigate(['application/content']);
  }

  redirectToProjects(){
    this._router.navigate(['application/projects']);

  }

  onRowReorder(){
    var num : number = 1;
    this.chapters.forEach( (chapter) => chapter.chapterNumber = num++);
    // call save function from api
  }

  private getChaptersData() {
    this.chapters = [];
    this.chaptersService.getChapters(this.projectId).subscribe((data)=>{
      if(data){
        this.chapters = data;
        console.log(this.chapters);
        this.selectedChapter = this.chapters[0];
        const stringValue = JSON.stringify(this.selectedChapter.chapterId);
        sessionStorage.setItem("chapterId", stringValue);
      }
    })

    this.selectedChapter = this.chapters[0];


    this.columns = this.setColumns();
  }

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

}
