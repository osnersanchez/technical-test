import { Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { ViewProductComponent } from '../pages/view-product/view-product.component';
import { ListProductsAdminComponent } from '../../admin/pages/list-products/list-products.component';
import { ListProductsComponent } from '../pages/list-products/list-products.component';
import { userGuard } from '../../../shared/guards/admin.guard';
import { ShoppingCartComponent } from '../pages/shopping-cart/shopping-cart.component';

export const routerLayout: Routes = [
  {
    component: LayoutComponent,
    path: '',
    children: [
      { path: '', redirectTo: 'list-product', pathMatch: 'full' },
      { path: 'list-product', component: ListProductsComponent },
      { path: 'list-products-admin', component: ListProductsAdminComponent },
      { path: 'view-product/:id', component: ViewProductComponent },
      {
        path: 'shopping-cart',
        canActivate: [userGuard],
        component: ShoppingCartComponent,
      },
    ],
  },
];
