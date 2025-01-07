import { Component, Input } from '@angular/core';
import { HarvestModel } from '../../models/harvest.model';

@Component({
  selector: 'melApp-harvestcard',
  imports: [],
  templateUrl: './harvestcard.component.html',
  styleUrl: './harvestcard.component.css',
})
export class HarvestcardComponent {
  @Input({ required: true }) harvest!: HarvestModel;
}
