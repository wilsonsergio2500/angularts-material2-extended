/// <reference path="external-views/external-views.module.ts" />
import { Routes, Route } from '@angular/router';
import { RootComponent } from './root.component';
import { DASHBOARD_ROUTES } from './dashboard/dashboard-routes';
import { LoginComponent } from './login/login.component';

export const ROOT_ROUTES: Routes = [
  {
    path: '', component: RootComponent,
    children: [
      <Route>{ path: 'login', component: LoginComponent},
      <Route>{
        path: 'views', loadChildren: './external-views/external-views.module#ExternalViewModule',
    },
      <Route>{ path: 'main', loadChildren: './main/main-view.module#MainModuleViewComponent' }
    ].concat(DASHBOARD_ROUTES),

  },
 
];
