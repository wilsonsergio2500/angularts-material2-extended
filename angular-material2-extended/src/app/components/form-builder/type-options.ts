
import { Fields } from '../../fomly-fields/Fields';
import { FieldGroups } from '../../fomly-fields/FieldGroups';
import { FormlyGroup} from '../../fomly-fields/FormlyGroup';
import { FormlyFieldConfig, FormlyFormBuilder } from '@ngx-formly/core';

export interface IFormTypeReference extends FormlyFieldConfig{
  namekeyLabel: string;
  namekey: string;

}

let input : IFormTypeReference = new Fields.InputField('input', 'Input Type', false) as IFormTypeReference;
input.namekeyLabel = 'Input';
input.namekey = 'inputText';
input.templateOptions.disabled = true;


let email: IFormTypeReference = new Fields.EmailField('email', 'Email Type', false) as IFormTypeReference;
email.namekeyLabel = 'Email';
email.namekey = 'emailText';
email.templateOptions.disabled = true;

let password : IFormTypeReference = new Fields.PasswordField('password', 'Password Type') as IFormTypeReference;
password.namekeyLabel = 'Password';
password.namekey = 'passwordText';
password.templateOptions.disabled = true;


export namespace TYPES{

  const InputGroup = new FormlyGroup<any>({ fields: [ input]});
  const EmailGroup = new FormlyGroup<any>({ fields: [ email ]});
  const PasswordGroup = new FormlyGroup<any>({ fields: [ password]})

  export const ALL : FormlyGroup<any>[] = [
    InputGroup,
    EmailGroup,
    PasswordGroup
    ]
}

export const TYPE_OPTIONS = [

    input

  
    
]
