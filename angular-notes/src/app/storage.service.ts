import { Injectable } from '@angular/core';
import { Tag } from './tag.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getTags(): Tag[] {
    const tags = localStorage.getItem('tags');
    if (tags) {
      return JSON.parse(tags);
    }
    return [];
  }

  saveTags(tags: Tag[]): void {
    localStorage.setItem('tags', JSON.stringify(tags));
  }

  createTag(tag: Tag): void {
    const tags = this.getTags();
    tags.push(tag);
    this.saveTags(tags);
  }

  updateTag(tag: Tag): void {
    const tags = this.getTags();
    const index = tags.findIndex(t => t.id === tag.id);
    if (index !== -1) {
      tags[index] = tag;
      this.saveTags(tags);
    }
  }

  deleteTag(tagId: number): void {
    const tags = this.getTags();
    const index = tags.findIndex(t => t.id === tagId);
    if (index !== -1) {
      tags.splice(index, 1);
      this.saveTags(tags);
    }
  }

}
