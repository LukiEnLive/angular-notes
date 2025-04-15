import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TagsComponent } from './tags/tags.component';
import { NotesComponent } from './notes/notes.component';
import { AddNoteComponent } from './add-note/add-note.component';

export const routes: Routes = [
    
        { path: 'notes', component: NotesComponent },
        { path: 'tags', component: TagsComponent },
        { path: 'add-note', component: AddNoteComponent },
        { path: '', redirectTo: 'notes', pathMatch: 'full' },
        
    
];
