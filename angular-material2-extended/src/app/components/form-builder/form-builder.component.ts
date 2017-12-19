import { Component } from '@angular/core';

import { FormlyGroup } from '../../fomly-fields/FormlyGroup';
import { IFormlyGroup} from '../../fomly-fields/IFormlyGroup';
import { TYPE_OPTIONS, TYPES} from './type-options';
import { FORM_PREVIEW } from './form-preview';
import { FieldGroups } from '../../fomly-fields/FieldGroups';
import { FormlyFieldConfig, FormlyFormBuilder } from '@ngx-formly/core';
import { Fields } from '../../fomly-fields/Fields'

interface IGroup{
  name: string;
  index: number;
}
@Component({
  selector: 'form-builder',
  templateUrl: 'form-builder.component.html',
 
  styleUrls: [
    `form-builder.style.css`
    ]
})
export class FormBuilderComponent{

  previews =  FORM_PREVIEW;
  

  formlyGroup = new FormlyGroup<any>( { fields: TYPE_OPTIONS } );
 

  formlyGroups : FormlyGroup<any>[] = TYPES.ALL;

  Groups: IGroup[] = [
        { name: `Root`, index: 0 },
        { name: `Group ${1}`, index: 1 }
    ]

  RootGroup: FieldGroups.GroupRow;
  GroupRef: FieldGroups.GroupRow[];
  FormControls: FormlyFieldConfig[] = [];
  constructor(private builder: FormlyFormBuilder) {

      this.formlyGroup.options.formState = {
          disabled: true,
      }

    const template = new FieldGroups.Template('<div [hidden]="true">Group 1</div>');
    template.className = 'col-md-12';
     const group =  new FieldGroups.GroupRow( [

        template
  
  
      ]);
    group.className = 'droppable-group col-md-12';

    this.RootGroup = group;
    this.GroupRef = [this.RootGroup];
    this.formlyGroupPreview = new FormlyGroup<any>( { fields: [this.RootGroup] } );
  }


 

  AddToGroup(group : IGroup, formlyGroup: FormlyGroup<any>){

      
    const fc = Object.assign({}, formlyGroup.fields[0]);
    

    const InputConfig: FormlyFieldConfig = <FormlyFieldConfig>{
        id: `formly_1_input_input_${this.FormControls.length + 1}`,
        key: `entry${this.FormControls.length + 1}`,
        type: fc.type,
        templateOptions: { type: fc.templateOptions.type, label: fc.templateOptions.label },
        modelOptions: {},
        className: 'col-md-12'
    }

    console.log(fc);
    //console.log(formcontrol)
    
    
    fc.className = 'col-md-12';


    this.FormControls.push(InputConfig)
    
    this.GroupRef[group.index].fieldGroup.push(InputConfig);

    this.builder.buildForm(this.formlyGroupPreview.form, this.formlyGroupPreview.fields, this.formlyGroupPreview.model, this.formlyGroupPreview.options);

    

    

  }






   formlyGroupPreview : IFormlyGroup<any>; 

 
  
}
