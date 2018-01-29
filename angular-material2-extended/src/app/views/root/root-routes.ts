import { Routes, Route } from '@angular/router';
import { RootComponent } from './root.component';
import { DASHBOARD_ROUTES } from './dashboard/dashboard-routes';

export const ROOT_ROUTES: Routes = [
  {
    path: '', component: RootComponent,
    children: [<Route>{
      path: 'views', loadChildren: './external-views/external-views.module#ExternalViewModule'
    }].concat(DASHBOARD_ROUTES)

  }
];
