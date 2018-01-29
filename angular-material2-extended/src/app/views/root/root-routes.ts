import { Routes } from '@angular/router';
import { RootComponent } from './root.component';
import { DASHBOARD_ROUTES } from './dashboard/dashboard-routes';

export const ROOT_ROUTES: Routes = [
  {
    path: '', component: RootComponent,
    children: [].concat(DASHBOARD_ROUTES)

  }
];
