import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HarvestcardComponent } from '../harvestcard/harvestcard.component';
import { HarvestModel } from '../../models/harvest.model';
import { HarvestsService } from '../../services/harvests.service';

@Component({
  selector: 'melApp-harvestlist',
  imports: [RouterModule, HarvestcardComponent],
  templateUrl: './harvestlist.component.html',
  styleUrl: './harvestlist.component.css',
})
export class HarvestlistComponent implements OnInit {
  harvests!: HarvestModel[];

  constructor(private readonly harvestService: HarvestsService) {}

  ngOnInit(): void {
    this.loadHarvests();
  }

  loadHarvests(): void {
    this.harvestService.getHarvests().subscribe({
      next: (response) => {
        console.log("loadHarvests payload")
        console.log(response.payload)
        this.harvests = response.payload;
      },
      error: (err) => {
        console.error('Error recuperando clientes', err);
      },
    });
  }
}
