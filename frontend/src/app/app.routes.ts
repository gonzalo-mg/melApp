import { Routes } from '@angular/router';
import { SupplierslistComponent } from './supplierslist/supplierslist.component';
import { SupplierformComponent } from './supplierform/supplierform.component';

export const routes: Routes = [
    {
        path: 'suppliers', component: SupplierslistComponent, title:"Proveedores"
    },
    {
        path: 'suppliers/:supplierId', component: SupplierformComponent, title:"Editar Proveedor"
    }
];
