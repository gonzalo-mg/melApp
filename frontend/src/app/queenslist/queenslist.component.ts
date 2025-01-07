import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { QueencardComponent } from '../queencard/queencard.component';
import { QueenModel } from '../../models/queen.model';
import { QueensService } from '../../services/queens.service';

@Component({
  selector: 'melApp-queenslist',
  imports: [RouterModule, QueencardComponent],
  templateUrl: './queenslist.component.html',
  styleUrl: './queenslist.component.css',
})
export class QueenslistComponent implements OnInit {
  queens!: QueenModel[];

  constructor(private readonly queensService: QueensService) {}

  ngOnInit(): void {
    this.loadQueens();
  }
  loadQueens(): void {
    this.queensService.getQueens().subscribe({
      next: (response) => {
        this.queens = response.payload;
      },
      error: (err) => {
        console.error('Error recupernado raíñas:', err);
      },
    });
  }
}
