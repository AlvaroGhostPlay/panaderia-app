import { Routes } from '@angular/router';
import { Public } from './components/public/public';
import { Dashboard } from './components/public/dashboard/dashboard';
import { Login } from './components/public/login/login';
import { Nosotros } from './components/public/nostros/nosotros';
import { Products } from './components/public/products/products';
import { Contact } from './components/public/contact/contact';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import { Rollback } from './components/components_generics/rollback/rollback';
import { DashboardUser } from './components/user/dashboard/dashboard.user';
import { User } from './components/user/user';
import { guestGuard } from './guards/guest.guard';
import { Store } from './components/user/store/store';
import { Favorites } from './components/user/favorites/favorites';
import { Orders } from './components/user/orders/orders';

export const routes: Routes = [
  // =========================
  // RUTAS USER
  // =========================
  {
    path: 'app',
    component: User,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        // @ts-ignore
        canActivate: [roleGuard(['ROLE_USER'])],
        component: DashboardUser,
      },
      {
        path: 'home',
        // @ts-ignore
        canActivate: [roleGuard(['ROLE_USER'])],
        component: DashboardUser,
      },
      {
        path: 'store',
        // @ts-ignore
        canActivate: [roleGuard(['ROLE_USER'])],
        component: Store,
      },
      {
        path: 'favorites',
        // @ts-ignore
        canActivate: [roleGuard(['ROLE_USER'])],
        component: Favorites,
      },
      {
        path: 'orders',
        // @ts-ignore
        canActivate: [roleGuard(['ROLE_USER'])],
        component: Orders,
      },
    ],
  },
  {
    path: 'rollback',
    component: Rollback,
  },
  {
    path: '',
    component: Public,
    canActivate: [guestGuard],
    children: [
      {
        path: '',
        component: Dashboard,
      },
      {
        path: 'home',
        component: Dashboard,
      },
      {
        path: 'login',
        component: Login,
      },
      {
        path: 'we',
        component: Nosotros,
      },
      {
        path: 'catalog',
        component: Products,
      },
      {
        path: 'contact',
        component: Contact,
      },
    ],
  },

  // =========================
  // RUTAS EMPLEADO
  // =========================
];
