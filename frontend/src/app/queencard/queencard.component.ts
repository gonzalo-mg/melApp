import { Component, Input } from '@angular/core';
import { QueenModel } from '../../models/queen.model';

@Component({
  selector: 'melApp-queencard',
  imports: [],
  templateUrl: './queencard.component.html',
  styleUrl: './queencard.component.css',
})
export class QueencardComponent {
  @Input({ required: true }) queen!: QueenModel;
}
