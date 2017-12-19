
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


let template : IFormTypeReference = new FieldGroups.Template('<div>Template</div>') as IFormTypeReference;
template.namekeyLabel = 'Template';
template.namekey = 'template';
template.className = 'col-md-12 col-xs-12';

let Group : IFormTypeReference = new FieldGroups.Template('<div>Group</div>') as IFormTypeReference;
Group.namekeyLabel = 'group';
Group.namekey = 'group';



export namespace TYPES{

  const InputGroup = new FormlyGroup<any>({ fields: [ input]});
  const EmailGroup = new FormlyGroup<any>({ fields: [ email ]});
  const PasswordGroup = new FormlyGroup<any>({ fields: [ password]});
  const TemplateGroup = new FormlyGroup<any>({ fields: [ template ]})
  const GroupGroup = new FormlyGroup<any>({ fields: [Group] });


  export const ALL : FormlyGroup<any>[] = [
    InputGroup,
    EmailGroup,
    PasswordGroup,
    TemplateGroup,
    GroupGroup
    ]
}

export const TYPE_OPTIONS = [

    input

  
    
]
