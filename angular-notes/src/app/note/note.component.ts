import { Component, input } from '@angular/core';
import { TagComponent } from '../tag/tag.component';
import { Note } from '../note.model';

@Component({
  selector: 'app-note',
  imports: [TagComponent],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css'
})
export class NoteComponent {
  note = input<Note>()
}
