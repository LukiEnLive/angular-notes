import { Component } from '@angular/core';
import { StorageService } from '../storage.service';
import { Note } from '../note.model';
import { Tag } from '../tag.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-note',
  imports: [FormsModule],
  templateUrl: './add-note.component.html',
  styleUrl: './add-note.component.css'
})
export class AddNoteComponent {
  constructor(private storage: StorageService) {
    this.tags = this.storage.getTags();
  }

  newNote: Note = {
    id: 0,
    title: '',
    content: '',
    tags: [],
  };
  tags: Tag[] = [];

  submitNewNote(event: Event) {
    event.preventDefault();
    if (this.newNote.title == '' || this.newNote.content == '') {
      alert("Veuillez remplir le champ titre et le champ contenu !");
      return;
    }
    this.newNote.id = Date.now();
    this.storage.createNote(this.newNote);
    alert("Note ajoutée avec succès !");
    this.newNote = {
      id: 0,
      title: '',
      content: '',
      tags: [],
    };
  }
}