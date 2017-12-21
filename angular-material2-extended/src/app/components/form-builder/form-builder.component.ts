import { Component } from '@angular/core';

import { FormlyGroup } from '../../fomly-fields/FormlyGroup';
import { IFormlyGroup} from '../../fomly-fields/IFormlyGroup';
import { TYPE_OPTIONS, TYPES} from './type-options';
import { FORM_PREVIEW } from './form-preview';
import { FieldGroups } from '../../fomly-fields/FieldGroups';
import { FormlyFieldConfig, FormlyFormBuilder } from '@ngx-formly/core';
import { Fields } from '../../fomly-fields/Fields';
import { EDIT_TYPES } from './edit-types'

interface IGroup{
  name: string;
  index: number;
}

interface IFormlyConfigFormBuilder extends FormlyFieldConfig{
  nameId: string;
  namekeyLabel: string;
  namekey: string;
  template?: string;
}
@Component({
  selector: 'form-builder',
  templateUrl: 'form-builder.component.html',
 
  styleUrls: [
    `form-builder.style.css`
    ]
})
export class FormBuilderComponent{

  
  formlyGroupPreview : IFormlyGroup<any>; 
  formlyGroup = new FormlyGroup<any>( { fields: TYPE_OPTIONS } );

  InputType: IFormlyConfigFormBuilder;
 

  formlyGroups : FormlyGroup<any>[] = TYPES.ALL;

  Groups: IGroup[] = [
        { name: `Root`, index: 0 },
    ]

  RootGroup: FieldGroups.GroupRow;
  GroupRef: FieldGroups.GroupRow[];
  FormControls: IFormlyConfigFormBuilder[] = [];
  constructor(private builder: FormlyFormBuilder) {

      this.formlyGroup.options.formState = {
          disabled: true,
      }

    const template = new FieldGroups.Template('<div class="signal-group">Group 1 - Root</div>');
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

      
    const fc = Object.assign({}, formlyGroup.fields[0]) as IFormlyConfigFormBuilder;
    //console.log(fc);
    //console.log(this.GroupRef)
    let InputConfig: IFormlyConfigFormBuilder;

    if(!!fc.type){
          switch (fc.type){
            case 'input':
              InputConfig = <IFormlyConfigFormBuilder>{
                
                namekey: fc.namekey,
                namekeyLabel: `${fc.namekeyLabel} ${this.FormControls.length + 1}`,
                nameId: `Input${this.FormControls.length + 1}`,
                key: `entry${this.FormControls.length + 1}`,
                type: fc.type,
                templateOptions: {
                  type: fc.templateOptions.type,
                  label: `${fc.namekeyLabel} ${this.FormControls.length + 1}`, //fc.templateOptions.label,
                  required: fc.templateOptions.required
                },
                modelOptions: {},
                className: 'col-md-12 col-xs-12',
                validators: fc.validators,
                asyncValidators: fc.asyncValidators,
        
              };
              this.FormControls.push(InputConfig)
              this.GroupRef[group.index].fieldGroup.push(InputConfig);
              break;

             
          }
      } else {

       
        switch((fc as any).namekey){
          case 'template':
            InputConfig = <IFormlyConfigFormBuilder>{
                namekey: fc.namekey,
                namekeyLabel: `${(fc as any).namekeyLabel} ${this.FormControls.length + 1}`,
                nameId: `Input${this.FormControls.length + 1}`,
                key: `entry${this.FormControls.length + 1}`,
                
                template: fc.template,
                className: 'col-md-12 col-xs-12',
            }
            this.FormControls.push(InputConfig)
            this.GroupRef[group.index].fieldGroup.push(InputConfig);
            break;
          case 'group':
            let tmptGroup : IFormlyConfigFormBuilder = new FieldGroups.Template(`<div class="group-signal">Group${this.GroupRef.length + 1}</div>`) as IFormlyConfigFormBuilder;
            tmptGroup.namekeyLabel = 'temptemplate';
            tmptGroup.className = 'col-md-12 col-xs-12';
            let Grp : IFormlyConfigFormBuilder = new FieldGroups.GroupRow([ tmptGroup ]) as IFormlyConfigFormBuilder;
            Grp.type = 'formly-group';
            Grp.namekeyLabel = `${'Group'} ${this.GroupRef.length + 1}`;
            Grp.nameId =  `Group${this.GroupRef.length + 1}`;
            Grp.className = 'droppable-group col-md-12 col-xs-12';
            this.Groups.push({ name: `Group ${this.GroupRef.length + 1}`, index: this.GroupRef.length})
            this.GroupRef.push(Grp)
            this.GroupRef[group.index].fieldGroup.push(Grp);
            break;
          
           
         
        }
      }
    


    this.formlyGroupPreview = new FormlyGroup<any>( { fields: [this.RootGroup] } );
    this.formlyGroupPreview.model = Object.assign({}, this.formlyGroupPreview.model);

    this.builder.buildForm(this.formlyGroupPreview.form, this.formlyGroupPreview.fields, this.formlyGroupPreview.model, this.formlyGroupPreview.options);

  }



  formlyInputTypeGroup : IFormlyGroup<any>;
  InputTypeChanged($event: any){

    const value = $event.value as IFormlyConfigFormBuilder;

    console.log(value);
   
    const {key, id, type, templateOptions, nameId, className, template} = Object.assign({}, value);
    this.formlyInputTypeGroup = Object.assign({}, EDIT_TYPES.NAMES[value.namekey]);
    this.formlyInputTypeGroup.model = <IFormlyConfigFormBuilder>{
      key,
      id,
      type,
      templateOptions,
      nameId,
      className,
      template
    }

    this.builder.buildForm(this.formlyInputTypeGroup.form, this.formlyInputTypeGroup.fields, this.formlyInputTypeGroup.model, this.formlyInputTypeGroup.options);
   
    
  }

  updateInputType(){

  
    
    let field = this.FormControls.find((el) => el.nameId === this.InputType.nameId);
    field = Object.assign(field, this.objectWithoutKey(this.formlyInputTypeGroup.model, 'mameId'));

    

     this.formlyGroupPreview = new FormlyGroup<any>( { fields: [this.RootGroup] } );

    this.builder.buildForm(this.formlyGroupPreview.form, this.formlyGroupPreview.fields, this.formlyGroupPreview.model, this.formlyGroupPreview.options);
  
    
  }
   
   objectWithoutKey = (object, key) => {
    const {[key]: deletedKey, ...otherKeys} = object;
    return otherKeys;
  }

  submit(){

  }
  
}
