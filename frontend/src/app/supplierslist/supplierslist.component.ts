import { Component, Input } from '@angular/core';
import { SupplierModel } from '../models/supplier.model';
import { SuppliercardComponent } from '../suppliercard/suppliercard.component';

@Component({
  selector: 'melApp-supplierslist',
  standalone: true,
  imports: [SuppliercardComponent],
  templateUrl: './supplierslist.component.html',
  styleUrl: './supplierslist.component.css',
})
export class SupplierslistComponent {
  @Input({ required: true }) suppliers!: Array<SupplierModel>;
}
