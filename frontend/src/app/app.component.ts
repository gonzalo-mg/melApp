import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashcardComponent } from './dashcard/dashcard.component';

import { SupplierModel } from './models/supplier.model';
import { SupplierslistComponent } from './supplierslist/supplierslist.component';

@Component({
  selector: 'melApp-root',
  standalone: true,
  imports: [RouterOutlet, SupplierslistComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend';

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
