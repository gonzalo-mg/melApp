import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { SupplierslistComponent } from './supplierslist/supplierslist.component';
import { SupplierformComponent } from './supplierform/supplierform.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientslistComponent } from './clientslist/clientslist.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
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
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Dashboard',
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
  {
    path: 'clients',
    component: ClientslistComponent,
    title: 'Clientes',
  },
];
