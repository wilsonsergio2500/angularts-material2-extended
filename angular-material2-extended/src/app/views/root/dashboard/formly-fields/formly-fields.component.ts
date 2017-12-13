
import { Component} from '@angular/core';
import { FormlyGroup } from '../../../../fomly-fields/FormlyGroup';
import { IFormlyGroup } from '../../../../fomly-fields/IFormlyGroup';
import { Fields } from '../../../../fomly-fields/Fields';

interface IMember{
  username: string;
  suffix: string;
  name: string;
  lastname: string;
  email: string;
  zipcode: number;
  subscribed: boolean;
}

@Component({
  selector: 'formly-field-types',
  templateUrl: 'formly-fields.component.html'
})
export class FormlyFieldsTypesComponent{

  formlyGroup : IFormlyGroup<IMember>;
  constructor(){


    this.formlyGroup = new FormlyGroup<IMember>();
    this.formlyGroup.fields = [
      new Fields.InputField('username', 'User Name', true),
      new Fields.SelectField('suffix', 'Suffix', [{ label: 'Mr.', value: 'Mr.'}, {label: 'Ms.', value: 'Ms.'}], true),
      new Fields.InputField('name', 'Name', true),
      new Fields.InputField('lastname', 'Last Name', true),
      new Fields.EmailField('email', 'Email', true),
      new Fields.NumberField('zipcode', 'Zip Code', true),
      new Fields.RadioField('radio', 'Radio', [{ key: 1, value: 'Adminstrator'}, {key: 2, value: 'Member'}] ),
      new Fields.CheckBoxField('subscribed', 'Subscribe')
    ]


  }

  submit(){
    console.log(this.formlyGroup.model);
  }
}
