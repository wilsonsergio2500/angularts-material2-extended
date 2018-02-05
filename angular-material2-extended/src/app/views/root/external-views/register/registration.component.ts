
import { Component } from '@angular/core';
import { FormlyGroup } from '../../../../fomly-fields/FormlyGroup';
import { AngularFireAuth } from 'angularfire2/auth';
import { Fields } from '../../../../fomly-fields/Fields';
import { IFormlyGroup } from '../../../../fomly-fields/IFormlyGroup';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

const PasswordAllowedLength = 8;

@Component({
  selector: 'registration',
  templateUrl: 'registration.component.html',
  styleUrls: [
    'registration.component.css'
  ]
})
export class RegistrationComponent {

  formlyGroup: IFormlyGroup<any>;
  working: boolean;
  constructor(private fireAuth: AngularFireAuth) {
    this.InitForm();
  }
  InitForm() {

    const email = new Fields.EmailField('email', 'Email', true);
    const password = new Fields.PasswordField('password', 'Password');
    password.validators = {
      'lengthallowed': {
        expression: (fg: FormGroup) => {
          return (!!fg.value) && ( (fg.value as string).length >= PasswordAllowedLength);
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
          return fg.value === this.formlyGroup.model.password;
        },
        message: (g: any, p: FormlyFieldConfig) => {
          return `Password must match the above`;
        }
      }
    };

    const fields = [
      email,
      password,
      passwordConfirmation
    ];

    this.formlyGroup = new FormlyGroup<any>({ fields });
  }
  formSubmit(model: any) {
    this.working = true;


    this.fireAuth.auth.createUserWithEmailAndPassword(model.email, model.password).then(() => {

      setTimeout(() => { this.working = false; }, 300);

    }).catch((e) => {

      });

  }

}
