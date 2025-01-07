import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApiariesService } from '../../services/apiaries.service';
import { ApiaryModel } from '../../models/apiary.model';
import { ApiarycardComponent } from '../apiarycard/apiarycard.component';

@Component({
  selector: 'melApp-apiarieslist',
  imports: [RouterModule, ApiarycardComponent],
  templateUrl: './apiarieslist.component.html',
  styleUrl: './apiarieslist.component.css'
})
export class ApiarieslistComponent {
  apiaries!: ApiaryModel[];

  constructor(private readonly apiariesService: ApiariesService) {}

  ngOnInit(): void {
    this.loadApiaries();
  }
  loadApiaries(): void {
    this.apiariesService.getApiaries().subscribe({
      next: (response) => {
        this.apiaries = response.payload;
      },
      error: (err) => {
        console.error('Error recupernado apiarios:', err);
      },
    });
  }
}
