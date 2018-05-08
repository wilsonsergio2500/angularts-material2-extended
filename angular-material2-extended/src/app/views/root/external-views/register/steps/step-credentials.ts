/// <reference path="../../../../../components/formly-stepper/models/FormlyStepper.ts" />

import { Fields } from '../../../../../fomly-fields/Fields';
import { FormlyGroup } from '../../../../../fomly-fields/FormlyGroup';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { IFormlyStepper } from '../../../../../components/formly-stepper/models/FormlyStepper';




export const GetSetpCredFiels = (stepper: { control: IFormlyStepper<any> }) => {

  const PasswordAllowedLength = 8;
  const email = new Fields.EmailField('email', 'Email', true);
  const password = new Fields.PasswordField('password', 'Password');

  password.validators = {
    'lengthallowed': {
      expression: (fg: FormGroup) => {
        return (!!fg.value) && ((fg.value as string).length >= PasswordAllowedLength);
      },
      message: (error, field: FormlyFieldConfig) => {
        return `${field.templateOptions.label} has an invalid length`;
      }
    }
  }

  const passwordConfirmation = new Fields.PasswordField('passwordconfirm', 'Password Confirmation');
  passwordConfirmation.validators = {
    'match': {
      expression: (fg: FormGroup) => {
        return (!!stepper.control) ?  fg.value === stepper.control.Model.password : false;
      },
      message: (g: any, p: FormlyFieldConfig) => {
        return `Password must match the above`;
      }
    }
  };


  return [
    email,
    password,
    passwordConfirmation]

}

