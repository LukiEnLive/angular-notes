import { Component } from '@angular/core';
import { StorageService } from '../storage.service';
import { Tag } from '../tag.model';
import { TagComponent } from '../tag/tag.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tags',
  imports: [TagComponent, FormsModule],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})
export class TagsComponent {
  constructor(private storage: StorageService) {
    this.loadTags();
  }

  loaded: boolean = false;
  tags: Tag[] = [];
  editing : Tag | null = null;

  loadTags() {
    if (this.loaded) return;
    this.loaded = true;
    this.tags = this.storage.getTags();
  }

  dialogAddTag() {
    const tagName = prompt("Entrer le nom de la nouvelle étiquette : ");
    if (tagName) {
      const newTag: Tag = { id: Date.now(), name: tagName, color: 'blue' };
      this.storage.createTag(newTag);
      this.tags.push(newTag);
      this.loadTags();
    }

  }

  dialogDeleteTag(tag: Tag) {
    const confirmDelete = confirm(`Etes-vous sûr de vouloir supprimer l'étiquette "${tag.name}" ?`);
    if (confirmDelete) {
      this.storage.deleteTag(tag.id);
      this.tags = this.tags.filter(t => t.id !== tag.id);
      this.loadTags();
    }
  }

  startEditingEmptyTag() {
    this.editing = { id: 0, name: '', color: '' };
  }

  submitEditing(event: Event) {
    event.preventDefault();
    if (this.editing) {
      if (this.editing.id === 0) {
        const newTag: Tag = { id: Date.now(), name: this.editing.name, color: this.editing.color };
        this.storage.createTag(newTag);
        this.tags.push(newTag);
      }
      else {
        const index = this.tags.findIndex(t => t.id === this.editing?.id);
        if (index !== -1) {
          this.storage.updateTag(this.editing);
          this.tags[index] = { ...this.editing };
        }
      }
      this.editing = null;
    }
  }

  cancelEditing() {
    this.editing = null;
  }

  startEditingTag(tag: Tag) {
    this.editing = { ...tag };
  }


}
