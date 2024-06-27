import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { RegisterComponent } from './features/auth/pages/register/register.component';
import { ListProductsComponent } from './features/auth/pages/list-products/list-products.component';
import { ViewProductComponent } from './features/auth/pages/view-product/view-product.component';
import { ShoppingCartComponent } from './features/auth/pages/shopping-cart/shopping-cart.component';
import { ListProductsAdminComponent } from './features/admin/pages/list-products/list-products.component';
import { userGuard } from './shared/guards/admin.guard';
import { routerLayout } from './features/auth/layout/layout.route';
import { routerAdminLayout } from './features/admin/admin-layout/admin-layout.route';

export const routes: Routes = [
  { path: '', redirectTo: 'list-product', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  ...routerLayout,
  ...routerAdminLayout
];
