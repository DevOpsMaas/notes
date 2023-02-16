import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoteDetailsComponent } from './components/note-details/note-details.component';
import { NotesListComponent } from './components/notes-list/notes-list.component';

const routes: Routes = [
  { path: '', component: NotesListComponent },
  { path: 'new', component: NoteDetailsComponent },
  { path: ':id', component: NoteDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoteRoutingModule { }
