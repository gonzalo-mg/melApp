import { Component, OnInit } from '@angular/core';
import { SupplierModel } from '../../models/supplier.model';
import { SuppliercardComponent } from '../suppliercard/suppliercard.component';
import { SuppliersService } from '../../services/suppliers.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'melApp-supplierslist',
  standalone: true,
  imports: [SuppliercardComponent, RouterModule],
  templateUrl: './supplierslist.component.html',
  styleUrl: './supplierslist.component.css',
})
export class SupplierslistComponent implements OnInit {
  suppliers!: SupplierModel[];

  constructor(private readonly suppliersService: SuppliersService) {}

  ngOnInit(): void {
    this.loadSuppliers();
  }

  loadSuppliers(): void {
    this.suppliersService.getSuppliers().subscribe({
      next: (response) => {
        this.suppliers = response.payload;
      },
      error: (err) => {
        console.error('Error fetching suppliers', err);
      },
    });
  }
}
