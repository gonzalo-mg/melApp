import { Component, Input } from '@angular/core';
import { SupplierModel } from '../../models/supplier.model';

@Component({
  selector: 'melApp-suppliercard',
  imports: [],
  templateUrl: './suppliercard.component.html',
  styleUrl: './suppliercard.component.css',
})

export class SuppliercardComponent {
  @Input({ required: true }) supplier!: SupplierModel;
}
