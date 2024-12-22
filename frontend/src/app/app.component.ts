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
}
