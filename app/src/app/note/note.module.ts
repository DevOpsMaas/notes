import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoteRoutingModule } from './note-routing.module';
import { NotesListComponent } from './components/notes-list/notes-list.component';
import { NoteCardComponent } from './components/note-card/note-card.component';
import { NoteDetailsComponent } from './components/note-details/note-details.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    NotesListComponent,
    NoteCardComponent,
    NoteDetailsComponent
  ],
  imports: [
    CommonModule,
    NoteRoutingModule,
    FormsModule,
  ]
})
export class NoteModule { }
