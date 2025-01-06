import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { SupplierslistComponent } from './supplierslist/supplierslist.component';
import { SupplierformComponent } from './supplierform/supplierform.component';

export const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Register',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: 'suppliers',
    component: SupplierslistComponent,
    title: 'Proveedores',
  },
  {
    path: 'suppliers/:supplierId',
    component: SupplierformComponent,
    title: 'Editar Proveedor',
  },
];
