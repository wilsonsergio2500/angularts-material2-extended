
import { RootComponent } from './root.component';
import { LoginComponent } from './login/login.component';
import { DASHBOARD_COMPONENTS } from './dashboard/components';

export const ROOT_COMPONENTS = [
  RootComponent,
  LoginComponent
].concat(DASHBOARD_COMPONENTS);
