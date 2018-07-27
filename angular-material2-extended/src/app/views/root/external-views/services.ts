
import { EmailConfirmationResolver } from './comfirm/email-confirmation.resolver'

export function GetExternalViewProviders() {
  return [
    EmailConfirmationResolver
  ];
}
