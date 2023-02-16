import { Injectable } from '@angular/core';
import { Note } from '../model/note.model';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  notes: Note[] = new Array<Note>();

  getAll() {
    return this.notes;
  }

  get(id: number) {
    return this.notes[id];
  }

  getId(note: Note) {
    return this.notes.indexOf(note);
  }

  addNote(note: Note) {
    let newLength = this.notes.push(note);
    let index = newLength - 1;

    return index;
  }

  updateNote(id: number, title: string, body: string) {
    let note = this.notes[id];

    note.title = title;
    note.body = body;
  }

  deleteNote(id: number) {
    this.notes.splice(id, 1);
  }
}
