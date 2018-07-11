
import { RootComponent } from './root.component';
import { LoginComponent } from './login/login.component';
import { DASHBOARD_COMPONENTS } from './dashboard/components';

export function ROOT_COMPONENTS() {
  return [
    RootComponent,
    LoginComponent,
    ...DASHBOARD_COMPONENTS()
  ]
}

