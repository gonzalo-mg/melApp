import { Component, Input } from '@angular/core';
import { ClientModel } from '../../models/client.model';

@Component({
  selector: 'melApp-clientcard',
  imports: [],
  templateUrl: './clientcard.component.html',
  styleUrl: './clientcard.component.css',
})
export class ClientcardComponent {
  @Input({ required: true }) client!: ClientModel;
}
