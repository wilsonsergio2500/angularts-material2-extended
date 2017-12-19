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
        //{ name: `Group ${1}`, index: 1 }
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

      
    const fc = Object.assign({}, formlyGroup.fields[0]);

    console.log(this.GroupRef)
    let InputConfig: IFormlyConfigFormBuilder;

    if(!!fc.type){
          switch (fc.type){
            case 'input':
              InputConfig = <IFormlyConfigFormBuilder>{
                namekeyLabel: `${(fc as any).namekeyLabel} ${this.FormControls.length + 1}`,
                nameId: `Input${this.FormControls.length + 1}`,
                key: `entry${this.FormControls.length + 1}`,
                type: fc.type,
                templateOptions: {
                  type: fc.templateOptions.type,
                  label: fc.templateOptions.label,
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

              case 'formly-group':
                console.log('group')
                let GroupConfig = Object.assign({}, fc) as IFormlyConfigFormBuilder;
                console.log(GroupConfig);
                GroupConfig.namekeyLabel = `${(fc as any).namekeyLabel} ${this.FormControls.length + 1}`;
                GroupConfig.nameId =  `Input${this.FormControls.length + 1}`;
                GroupConfig.fieldGroup[0].template = `<div class="group-signal">Group ${this.GroupRef.length + 1}</div>`
                this.Groups.push({ name: `Group ${this.GroupRef.length + 1}`, index: this.GroupRef.length})
                this.GroupRef.push(GroupConfig)
                this.GroupRef[group.index].fieldGroup.push(GroupConfig);
                
              break;
          }
      } else {

        console.log((fc as any).namekey)
        switch((fc as any).namekey){
          case 'template':
            InputConfig = <IFormlyConfigFormBuilder>{
                 namekeyLabel: `${(fc as any).namekeyLabel} ${this.FormControls.length + 1}`,
                nameId: `Input${this.FormControls.length + 1}`,
                key: `entry${this.FormControls.length + 1}`,
                template: fc.template,
            }
            this.FormControls.push(InputConfig)
            this.GroupRef[group.index].fieldGroup.push(InputConfig);
            break;
          //case 'group':
          //  let tmptGroup : IFormlyConfigFormBuilder = new FieldGroups.Template(`<div class="group-signal">Group${this.GroupRef.length + 1}</div>`) as IFormlyConfigFormBuilder;
          //  tmptGroup.namekeyLabel = 'temptemplate';
          //  //tmptGroup.na = 'temptemplate';
          //  tmptGroup.className = 'col-md-12 col-xs-12';
          //  let Group : IFormlyConfigFormBuilder = new FieldGroups.GroupRow([ tmptGroup ]) as IFormlyConfigFormBuilder;
          //  Group.namekeyLabel = `${'Group'} ${this.FormControls.length + 1}`;
          //  Group.nameId =  `Group{this.FormControls.length + 1}`;
          //  this.GroupRef.push(group)
          //  this.GroupRef[group.index].fieldGroup.push(group);
          //  break;
          
            //  <IFormlyConfigFormBuilder>{
            //     namekeyLabel: `${(fc as any).namekeyLabel} ${this.FormControls.length + 1}`,
            //    nameId: `Input${this.FormControls.length + 1}`,
            //    key: `entry${this.FormControls.length + 1}`,
            //    template: fc.template,
            //}
         
        }
      }
    

    //const InputConfig: IFormlyConfigFormBuilder = <IFormlyConfigFormBuilder>{
    //    namekeyLabel: `${(fc as any).namekeyLabel} ${this.FormControls.length + 1}`,
    //    nameId: `Input${this.FormControls.length + 1}`,
    //    key: `entry${this.FormControls.length + 1}`,
    //    type: fc.type,
    //    templateOptions: {
    //      type: fc.templateOptions.type,
    //      label: fc.templateOptions.label,
    //      required: fc.templateOptions.required
    //    },
    //    modelOptions: {},
    //    className: 'col-md-12 col-xs-12',
    //    validators: fc.validators,
    //    asyncValidators: fc.asyncValidators,
        
    //};


    //this.FormControls.push(InputConfig)
    
    //this.GroupRef[group.index].fieldGroup.push(InputConfig);

    this.builder.buildForm(this.formlyGroupPreview.form, this.formlyGroupPreview.fields, this.formlyGroupPreview.model, this.formlyGroupPreview.options);

  }



  formlyInputTypeGroup : IFormlyGroup<any>;
  InputTypeChanged($event: any){

    const value = $event.value as IFormlyConfigFormBuilder;
    const {key, id, type, templateOptions, nameId, className} = Object.assign({}, value);
    this.formlyInputTypeGroup = Object.assign({}, EDIT_TYPES.NAMES[value.type]);
    this.formlyInputTypeGroup.model = <IFormlyConfigFormBuilder>{
      key,
      id,
      type,
      templateOptions,
      nameId,
      className
    }

    this.builder.buildForm(this.formlyInputTypeGroup.form, this.formlyInputTypeGroup.fields, this.formlyInputTypeGroup.model, this.formlyInputTypeGroup.options);
   
    
  }

  updateInputType(){

    const messages = {
        required: (error, field: FormlyFieldConfig) => {
          return `${field.templateOptions.label} is required`;
        }
      }
    
    let field = this.FormControls.find((el) => el.nameId === this.InputType.nameId);
    field = Object.assign(field, this.objectWithoutKey(this.formlyInputTypeGroup.model, 'mameId'));

    console.log(field.templateOptions.required);
    if(field.templateOptions.required){
      field.validation = { messages }
     } else {
      field.validation = {}
    }
    console.log(field.validation)



    this.builder.buildForm(this.formlyGroupPreview.form, this.formlyGroupPreview.fields, this.formlyGroupPreview.model, this.formlyGroupPreview.options);
  
    
  }
   
   objectWithoutKey = (object, key) => {
    const {[key]: deletedKey, ...otherKeys} = object;
    return otherKeys;
  }

  submit(){

  }
  
}
