import { Component } from '@angular/core';

import { FormlyGroup } from '../../fomly-fields/FormlyGroup';
import { IFormlyGroup} from '../../fomly-fields/IFormlyGroup';
import { TYPE_OPTIONS, TYPES} from './type-options';
import { FORM_PREVIEW } from './form-preview';
import { FieldGroups } from '../../fomly-fields/FieldGroups';
import { FormlyFieldConfig, FormlyFormBuilder } from '@ngx-formly/core';
import { Fields } from '../../fomly-fields/Fields';
import { EDIT_TYPES } from './edit-types'

const getGroupTemplate = (grouplabel: string) => {
  return `<div class="signal-group"><div class="group-indicator">${grouplabel}</div></div>`
}

interface IGroup{
  name: string;
  index: number;
}

interface IFormlyConfigFormBuilder extends FormlyFieldConfig{
  nameId: string;
  namekeyLabel: string;
  namekey: string;
  template?: string;
  ENUM_ID: string;
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
  InputType: IFormlyConfigFormBuilder;

  formlyGroups : FormlyGroup<any>[] = TYPES.ALL;
  FieldSchema: IFormlyConfigFormBuilder[];

  Groups: IGroup[] = [
        { name: `Root`, index: 0 },
    ]

  RootGroup: FieldGroups.GroupRow;
  GroupRef: FieldGroups.GroupRow[];
  FormControls: IFormlyConfigFormBuilder[] = [];
  constructor(private builder: FormlyFormBuilder) {

    

    const template = new FieldGroups.Template(getGroupTemplate('Group 1 - Root')) as IFormlyConfigFormBuilder;
    template.className = 'col-md-12';
    template.ENUM_ID = 'template';
     const group =  new FieldGroups.GroupRow( [
        template
  
      ]) as IFormlyConfigFormBuilder;
    group.className = 'droppable-group col-md-12';
    group.ENUM_ID = 'group';

    this.RootGroup = group;
    this.GroupRef = [this.RootGroup];
    this.formlyGroupPreview = new FormlyGroup<any>( { fields: [this.RootGroup] } );
  }

  
 

  AddToGroup(group : IGroup, formlyGroup: FormlyGroup<any>){

      
    const fc = Object.assign({}, formlyGroup.fields[0]) as IFormlyConfigFormBuilder;
    const ENUM_ID = fc.ENUM_ID;
   
    let InputConfig: IFormlyConfigFormBuilder;


    switch(fc.namekey){
          case 'template':
            InputConfig = <IFormlyConfigFormBuilder>{
                ENUM_ID,
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
            let tmptGroup : IFormlyConfigFormBuilder = new FieldGroups.Template(getGroupTemplate(`Group ${this.GroupRef.length + 1}`)) as IFormlyConfigFormBuilder;
            tmptGroup.namekeyLabel = 'temptemplate';
            tmptGroup.className = 'col-md-12 col-xs-12';
            tmptGroup.ENUM_ID = 'template';
            let Grp : IFormlyConfigFormBuilder = new FieldGroups.GroupRow([ tmptGroup ]) as IFormlyConfigFormBuilder;
            Grp.type = 'formly-group';
            Grp.namekeyLabel = `${'Group'} ${this.GroupRef.length + 1}`;
            Grp.nameId =  `Group${this.GroupRef.length + 1}`;
            Grp.className = 'droppable-group col-md-12 col-xs-12';
            Grp.ENUM_ID = ENUM_ID;
            this.Groups.push({ name: `Group ${this.GroupRef.length + 1}`, index: this.GroupRef.length})
            this.GroupRef.push(Grp)
            this.GroupRef[group.index].fieldGroup.push(Grp);
            break;
        case 'input':
              InputConfig = <IFormlyConfigFormBuilder>{
                ENUM_ID,
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

    

    setTimeout(() => {
      this.FieldSchema = this.getOriginalFieldList([this.RootGroup as IFormlyConfigFormBuilder]);
      
    },100)
    

    this.formlyGroupPreview = new FormlyGroup<any>( { fields: this.getOriginalFieldList([this.RootGroup as IFormlyConfigFormBuilder]) } );


    this.builder.buildForm(this.formlyGroupPreview.form, this.formlyGroupPreview.fields, this.formlyGroupPreview.model, this.formlyGroupPreview.options);

  }



  formlyInputTypeGroup : IFormlyGroup<any>;
  InputTypeChanged($event: any){

    const value = $event.value as IFormlyConfigFormBuilder;
   
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

  UpdateInputType(){

    let field = this.FormControls.find((el) => el.nameId === this.InputType.nameId);
    field = Object.assign(field, this.objectWithoutKey(this.formlyInputTypeGroup.model, 'mameId'));

    
    this.formlyGroupPreview = new FormlyGroup<any>( { fields: this.getOriginalFieldList([this.RootGroup as IFormlyConfigFormBuilder]) } );

    this.builder.buildForm(this.formlyGroupPreview.form, this.formlyGroupPreview.fields, this.formlyGroupPreview.model, this.formlyGroupPreview.options);
  
    
  }

  DeleteInput(){

    this.FormControls = this.FormControls.filter(x => x.nameId !== this.InputType.nameId);
    this.RemoveFromLocation([this.RootGroup  as IFormlyConfigFormBuilder]);
    this.formlyGroupPreview = new FormlyGroup<any>( { fields: this.getOriginalFieldList([this.RootGroup as IFormlyConfigFormBuilder]) } );
    this.InputType = null;
 
  }
  RemoveFromLocation(fields : IFormlyConfigFormBuilder[]){

    fields.forEach((item: IFormlyConfigFormBuilder, index: number) => {
       if(!!item.fieldGroup && item.fieldGroup.length){
          item.fieldGroup = (item.fieldGroup as IFormlyConfigFormBuilder[]).filter(x => x.nameId !== this.InputType.nameId);
          this.RemoveFromLocation(item.fieldGroup as IFormlyConfigFormBuilder[]);
       }
     
    });

  }

  getOriginalFieldList(fields : IFormlyConfigFormBuilder[]) : IFormlyConfigFormBuilder[]{
    let orignalFields : IFormlyConfigFormBuilder[] = [];


    fields.forEach((item: IFormlyConfigFormBuilder, index: number) => {
      let field : IFormlyConfigFormBuilder = TYPE_OPTIONS[item.ENUM_ID];
      switch(item.ENUM_ID){
        case 'group':
          field = this.objectWithoutKey(item, 'fieldGroup') as IFormlyConfigFormBuilder;
          if(!!item.fieldGroup.length){
            field.fieldGroup = this.getOriginalFieldList(item.fieldGroup as IFormlyConfigFormBuilder[]) 
          }
          break;
          case 'template':
          field = Object.assign({}, item);
          break;
          default:
          field.className = item.className;
          field.templateOptions = item.templateOptions;
          
          break;
          
      }
      delete field.id;
          
      field.nameId = item.nameId;
      orignalFields.push(Object.assign({}, field));
    });

    return orignalFields;
  }
   
   objectWithoutKey = (object, key) => {
    const {[key]: deletedKey, ...otherKeys} = object;
    return otherKeys;
  }

  submit(){

  }
  
}
