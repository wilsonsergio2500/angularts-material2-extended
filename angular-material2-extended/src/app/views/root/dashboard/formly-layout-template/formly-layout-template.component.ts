
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
  selector: 'formly-layout-template',
  templateUrl: 'formly-layout-template.component.html'
})
export class FomlyLayoutTemplateComponent {

   formlyGroup : IFormlyGroup<IMember>;

  
   
  constructor(){

    this.formlyGroup = new FormlyGroup<IMember>();

    const template1 = new FieldGroups.Template('<div><strong> Section Example 1 - (This is a Template)</strong></div>')
    template1.className = 'col-md-12';

    const html =`<h4>Let's say I want to have a paragraph - (This is a template)</h4>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam suscipit justo at nisi rutrum, eget suscipit velit faucibus. Vivamus rutrum porta lobortis. In hac habitasse platea dictumst. Duis tristique blandit tellus vel dictum. Praesent viverra ut nisl non volutpat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam imperdiet rutrum efficitur. Vestibulum tristique, urna id tincidunt vehicula, velit erat consequat nisl, a auctor velit mi vitae ipsum. Sed aliquam neque et vulputate suscipit.</p>`
    const template2 = new FieldGroups.Template(html);
    template2.className = 'col-md-12'

    const template3 = new FieldGroups.Template('template to the left - <strong>This is a template</strong>');
    template3.className = 'col-md-6 col-xs-12';
    const template4 = new FieldGroups.Template('template to the right - <strong>This is a template</strong>');
    template4.className = 'col-md-6 col-xs-12';

    const groupOTemplates = new FieldGroups.Group2(template3, template4);

    this.formlyGroup.fields = [
      new Fields.SelectField('suffix', 'Suffix', [{ label: 'Mr.', value: 'Mr.'}, {label: 'Ms.', value: 'Ms.'}], true),

      groupOTemplates,
      new FieldGroups.GroupRow([
        
        new FieldGroups.Group2(
            new Fields.InputField('lastname', 'Last Name', true),  
            new Fields.InputField('name', 'Name', true),
            
        ),

        template1,

        new FieldGroups.Group3(
           new Fields.InputField('username', 'User Name', true),
            new Fields.EmailField('email', 'Email', true),
           new Fields.NumberField('zipcode', 'Zip Code', true)
          )
        ]),
      template2,

      new FieldGroups.Group2(
        new Fields.RadioField('radio', 'Radio', [{ key: 1, value: 'Adminstrator'}, {key: 2, value: 'Member'}] ),
        new Fields.CheckBoxField('subscribed', 'Subscribe')
        )
      ]
  }

   submit(){
    console.log(this.formlyGroup.model);
  }
  
}
