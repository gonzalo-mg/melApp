import { Component } from '@angular/core';
import { DashcardComponent } from '../dashcard/dashcard.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'melApp-dashboard',
  standalone: true,
  imports: [DashcardComponent, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  targetPath: string = '';
  iconPath: string = '';
  cardTitle: string = 'Titulo';
}
