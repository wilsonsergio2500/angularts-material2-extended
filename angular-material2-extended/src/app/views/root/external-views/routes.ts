import { Routes } from '@angular/router';
import { ExternalViewComponent } from './external-view.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { RegistrationComponent } from './register/registration.component';
import { EmailConfimationComponent } from './comfirm/email-confirmation.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { EmailConfirmationResolver } from './comfirm/email-confirmation.resolver'

export const EXTERNAL_VIEW_ROUTES: Routes = [
  {
    path: '',
    component: ExternalViewComponent,
    children: [
      { path: 'welcome', component: WelcomeComponent },
      { path: 'register', component: RegistrationComponent },
      { path: 'email-confirmation', component: EmailConfimationComponent, canActivate: [AuthGuard], resolve: { user: EmailConfirmationResolver}}
    ]
  }
];
