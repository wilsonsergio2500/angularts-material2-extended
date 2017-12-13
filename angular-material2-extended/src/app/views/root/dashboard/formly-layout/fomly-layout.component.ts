import { Component } from '@angular/core';
import { FormlyGroup } from '../../../../fomly-fields/FormlyGroup';
import { IFormlyGroup } from '../../../../fomly-fields/IFormlyGroup';
import { Fields } from '../../../../fomly-fields/Fields';
import { FieldGroups  } from '../../../../fomly-fields/FieldGroups';

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
  selector: 'formly-layout',
  templateUrl: 'formly-layout.component.html'
  
})
export class FormlyLayoutComponent{

  formlyGroup : IFormlyGroup<IMember>;
  constructor(){

    this.formlyGroup = new FormlyGroup<IMember>();

    this.formlyGroup.fields = [
      new FieldGroups.GroupRow([
        new FieldGroups.Group2(
              new Fields.SelectField('suffix', 'Suffix', [{ label: 'Mr.', value: 'Mr.'}, {label: 'Ms.', value: 'Ms.'}], true),
            new Fields.InputField('name', 'Name', true)
        )
        ])
      ]

  }
}
