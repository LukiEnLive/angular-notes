import { Component } from '@angular/core';
import { Note } from '../note.model';
import { StorageService } from '../storage.service';
import { NoteComponent } from '../note/note.component';

@Component({
  selector: 'app-notes',
  imports: [[NoteComponent]],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})
export class NotesComponent {
  constructor(private storage: StorageService) {
    this.loadNotes();
  }
  notes: Note[] = [];
  loaded: boolean = false;

  loadNotes() {
    if (this.loaded) return;
    this.loaded = true;
    this.notes = this.storage.getNotes();
  }

  dialogDeleteNote(note: Note) {
    const confirmDelete = confirm(`Etes-vous sûr de vouloir supprimer la note "${note.title}" ?`);
    if (!confirmDelete) return;
    this.storage.deleteNote(note.id);
    this.notes = this.notes.filter(n => n.id !== note.id);
  }
}
