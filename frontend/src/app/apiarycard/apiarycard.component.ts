import { Component, Input } from '@angular/core';
import { ApiaryModel } from '../../models/apiary.model';

@Component({
  selector: 'melApp-apiarycard',
  imports: [],
  templateUrl: './apiarycard.component.html',
  styleUrl: './apiarycard.component.css',
})
export class ApiarycardComponent {
  @Input({ required: true }) apiary!: ApiaryModel;
}
