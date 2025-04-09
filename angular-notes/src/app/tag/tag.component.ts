import { Component, input } from '@angular/core';

@Component({
  selector: 'app-tag',
  imports: [],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.css'
})
export class TagComponent {
  id = input<number>(1);
  name = input<string>("Default Tag");
  color = input<string>("red");
}
