import { Routes } from '@angular/router';
import { ExternalViewComponent } from './external-view.component';
import { WelcomeComponent } from './welcome/welcome.component';

export const EXTERNAL_VIEW_ROUTES: Routes = [
  {
    path: '',
    component: ExternalViewComponent,
    children: [
      {path: 'welcome', component : WelcomeComponent}
    ]
  }
];
