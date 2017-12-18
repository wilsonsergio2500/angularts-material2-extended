import { Component } from '@angular/core';

import { FormlyGroup } from '../../fomly-fields/FormlyGroup';
import { IFormlyGroup} from '../../fomly-fields/IFormlyGroup';
import { TYPE_OPTIONS, TYPES} from './type-options';
import { FORM_PREVIEW } from './form-preview';
import { FieldGroups } from '../../fomly-fields/FieldGroups';
import { FormlyFieldConfig } from '@ngx-formly/core';

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
  constructor(){

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

    console.log(group, formlyGroup)
    console.log(this.GroupRef[group.index].fieldGroup)
    console.log(this.RootGroup)

    const formcontrol = formlyGroup.fields[0];
    console.log(formcontrol)
    formcontrol.templateOptions.disabled = false;
    formcontrol.className = 'col-md-12';

    this.FormControls.push(formcontrol)
    
    this.GroupRef[group.index].fieldGroup.push(formcontrol);

    //if(group.index === 0){

    //  this.RootGroup.fieldGroup.push(formlyGroup.fields[0]);
      
    //}


  
     

    //this.GroupRef[group.index - 1].fieldGroup.push(formlyGroup.fields[1]);

    

  }



  //group =  new FieldGroups.GroupRow( [

  //  new FieldGroups.Template('<div [hidden]="true">Group 1</div>')
  
  
  //]);
  //this.group.className = 'droppable-group col-md-12';



   formlyGroupPreview; // = new FormlyGroup<any>( { fields: this.previews } );

 
  
}
