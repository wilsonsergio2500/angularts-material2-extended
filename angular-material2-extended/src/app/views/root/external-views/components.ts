
import { WelcomeComponent } from './welcome/welcome.component';
import { ExternalViewComponent } from './external-view.component';
import { RegistrationComponent } from './register/registration.component';
import { EmailConfimationComponent } from './comfirm/email-confirmation.component';

export function EXTERNAL_VIEWS_COMPONENTS() {
  return [
    ExternalViewComponent,
    WelcomeComponent,
    RegistrationComponent,
    EmailConfimationComponent
  ];
}
