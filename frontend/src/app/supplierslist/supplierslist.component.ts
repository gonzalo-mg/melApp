import { Component, Input } from '@angular/core';
import { RouterModule, Routes, RouterOutlet } from '@angular/router';
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
  //@Input({ required: true }) suppliers!: Array<SupplierModel>;

  supplier1: SupplierModel = new SupplierModel({
    supplierId: '1',
    supplierName: 'proveedorTest',
    phone: '123456789',
    email: 'proveedorTest@example.com',
    web: 'www.proveedorTest.com',
    locality: 'Villa Bicho',
    street: 'Avenida de los Himenópteros',
    addressNumber: '1',
    notes:
      'lorem ipsum, lorem ipsum, lorem ipsum, lorem ipsum, lorem ipsum, lorem ipsum, lorem ipsum, lorem ipsum, lorem ipsum, .',
  });

  supplier2: SupplierModel = new SupplierModel({
    supplierId: '2',
    supplierName: 'proveedor2',
    phone: '123456789',
    email: 'proveedor2@example.com',
    web: 'www.proveedor2.com',
    locality: 'Villa Bicho',
    street: 'Avenida de los Himenópteros',
    addressNumber: '2',
    notes:
      '22222  lorem ipsum, lorem ipsum, lorem ipsum, lorem ipsum, lorem ipsum, lorem ipsum, lorem ipsum, lorem ipsum, lorem ipsum, .',
  });
  suppliers: Array<SupplierModel> = [this.supplier1, this.supplier2];
}
