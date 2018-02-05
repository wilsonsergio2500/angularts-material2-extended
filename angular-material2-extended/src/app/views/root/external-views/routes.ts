import { Routes } from '@angular/router';
import { ExternalViewComponent } from './external-view.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RegistrationComponent } from './register/registration.component';

export const EXTERNAL_VIEW_ROUTES: Routes = [
  {
    path: '',
    component: ExternalViewComponent,
    children: [
      { path: 'welcome', component: WelcomeComponent },
      { path: 'register', component: RegistrationComponent}
    ]
  }
];
