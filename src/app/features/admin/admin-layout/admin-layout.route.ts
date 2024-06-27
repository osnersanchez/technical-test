import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout.component';
import { ListProductsAdminComponent } from '../pages/list-products/list-products.component';
import { adminGuard } from '../../../shared/guards/admin.guard';

export const routerAdminLayout: Routes = [
  {
    component: AdminLayoutComponent,
    path: 'admin',
    children: [
      { path: '', redirectTo: 'list-product', pathMatch: 'full' },
      {
        path: 'list-product',
        canActivate: [adminGuard],
        component: ListProductsAdminComponent,
      },
    ],
  },
];
