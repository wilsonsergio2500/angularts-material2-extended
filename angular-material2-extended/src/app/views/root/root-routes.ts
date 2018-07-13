import { Routes, Route } from '@angular/router';
import { RootComponent } from './root.component';
import { DASHBOARD_ROUTES } from './dashboard/dashboard-routes';
import { LoginComponent } from './login/login.component';

export function ROOT_ROUTES() {
  return [
    <Route>{
      path: '', component: RootComponent,
      children: [
        ...DASHBOARD_ROUTES(),
        <Route>{ path: 'login', component: LoginComponent },
        <Route>{ path: 'views', loadChildren: 'app/views/root/external-views/external-views.module#ExternalViewModule' },
        <Route>{ path: 'main', loadChildren: 'app/views/root/main/main-view.module#MainModuleViewComponent' }
      ]
    },
    
  ];
}

