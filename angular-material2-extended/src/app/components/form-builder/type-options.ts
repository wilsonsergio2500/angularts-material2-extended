
import { Fields } from '../../fomly-fields/Fields';
import { FieldGroups } from '../../fomly-fields/FieldGroups';
import { FormlyGroup} from '../../fomly-fields/FormlyGroup';
import { FormlyFieldConfig, FormlyFormBuilder } from '@ngx-formly/core';

export interface IFormTypeReference extends FormlyFieldConfig{
  namekeyLabel: string;
  namekey: string;
  ENUM_ID: string;

}

let input : IFormTypeReference = new Fields.InputField('input', 'Input Type', false) as IFormTypeReference;
input.namekeyLabel = 'Input';
input.namekey = 'input';
input.ENUM_ID = 'input';
input.templateOptions.disabled = true;


let email: IFormTypeReference = new Fields.EmailField('email', 'Email Type', false) as IFormTypeReference;
email.namekeyLabel = 'Email';
email.namekey = 'input';
email.ENUM_ID = 'email';
email.templateOptions.disabled = true;

let password : IFormTypeReference = new Fields.PasswordField('password', 'Password Type') as IFormTypeReference;
password.namekeyLabel = 'Password';
password.namekey = 'input';
password.ENUM_ID = 'password';
password.templateOptions.disabled = true;

let number : IFormTypeReference = new Fields.NumberField('number', 'Number Type', false) as IFormTypeReference;
number.namekeyLabel = 'Number';
number.namekey = 'input';
number.ENUM_ID = 'number';
number.templateOptions.disabled = true;

let editor : IFormTypeReference = new Fields.EditorField('editor', 'Editor Type', false) as IFormTypeReference;
editor.templateOptions.disabled = true;
editor.namekeyLabel = 'Editor';
editor.namekey = 'input';
editor.ENUM_ID = 'editor';


let template : IFormTypeReference = new FieldGroups.Template('<div>Template</div>') as IFormTypeReference;
template.namekeyLabel = 'Template';
template.namekey = 'template';
template.ENUM_ID = 'template';
template.className = 'col-md-12 col-xs-12';

let group : IFormTypeReference = new FieldGroups.Template('<div>Group</div>') as IFormTypeReference;
group.namekeyLabel = 'group';
group.namekey = 'group';
group.ENUM_ID = 'group';



export namespace TYPES{

  const InputGroup = new FormlyGroup<any>({ fields: [ input]});
  const NumberGroup = new FormlyGroup<any>({ fields: [number]})
  const EmailGroup = new FormlyGroup<any>({ fields: [ email ]});
  const PasswordGroup = new FormlyGroup<any>({ fields: [ password]});
  const EditorGroup = new FormlyGroup<any>({ fields: [editor]});
  const TemplateGroup = new FormlyGroup<any>({ fields: [ template ]})
  const GroupGroup = new FormlyGroup<any>({ fields: [group] });
  


  export const ALL : FormlyGroup<any>[] = [
    InputGroup,
    NumberGroup,
    EmailGroup,
    PasswordGroup,
    EditorGroup,
    TemplateGroup,
    GroupGroup,
    
    ]
}

export const TYPE_OPTIONS = {
  input : Object.assign({}, input),
  number : Object.assign({}, number),
  email : Object.assign({}, email),
  password : Object.assign({}, password),
  group : Object.assign({}, group),
  editor: Object.assign({}, editor)
}
