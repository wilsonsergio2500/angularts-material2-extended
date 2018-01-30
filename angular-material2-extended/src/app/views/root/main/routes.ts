import { Routes, RouterModule } from '@angular/router';
import { MainViewComponent } from './main-view.component';
import { DashComponent } from './dashboard/dash.component';

export const MAIN_VIEW_ROUTES: Routes = [
  {
    path: '',
    component: MainViewComponent,
    children: [{ path: 'dashboard', component: DashComponent  }]
  }
];
