import { Routes } from '@angular/router';
import { Public } from './components/public/public';
import { Dashboard } from './components/public/dashboard/dashboard';

export const routes: Routes = [
  {
    path: '',
    component: Public,
    children: [
      {
        path: '',
        component: Dashboard,
      },
      {
        path: 'inicio',
        component: Dashboard,
      },
    ],
  },
];
