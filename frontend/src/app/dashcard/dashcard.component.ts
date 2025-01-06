import { Component, Input } from '@angular/core';

@Component({
  selector: 'melApp-dashcard',
  standalone: true,
  imports: [],
  templateUrl: './dashcard.component.html',
  styleUrl: './dashcard.component.css',
})
export class DashcardComponent {
  @Input({ required: true }) targetPath!: string;
  @Input({ required: true }) iconPath!: string;
  @Input({ required: true }) cardTitle!: string;
}
