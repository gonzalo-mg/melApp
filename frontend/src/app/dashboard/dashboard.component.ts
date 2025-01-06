import { Component } from '@angular/core';
import { DashcardComponent } from '../dashcard/dashcard.component';

@Component({
  selector: 'melApp-dashboard',
  standalone: true,
  imports: [DashcardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  targetPath: string = '';
  iconPath: string = '';
  cardTitle: string = 'Titulo';
}
