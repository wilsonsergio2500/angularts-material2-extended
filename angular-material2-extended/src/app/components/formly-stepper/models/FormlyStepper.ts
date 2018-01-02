
import { FormlyGroup } from '../../../fomly-fields/FormlyGroup';
import { IFormlyGroup } from '../../../fomly-fields/IFormlyGroup';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { Helpers } from '../../../helpers/Helpers'

export interface IFormlyStepperItem {
  Label: string;
  Fields: FormlyFieldConfig[];
}

export interface IFormlyStepper<T> {
  Model:  T;
  Size: number;
  Forms: IFormlyGroup<T>[] 
}

export class FormlyStepper<T> implements IFormlyStepper<T> {

  Forms: IFormlyGroup<T>[] = [];
  

  constructor(private steps: IFormlyStepperItem[], private viewmodel: T = <T>{}) {
    this.InitForms();
	
  }

 private InitForms() {
    this.steps.forEach((stepItem: IFormlyStepperItem) => {

      const fields = this.getFieldsCopy(stepItem.Fields);
      console.log(fields);
      const model = Object.assign({}, this.viewmodel);
      const form = new FormlyGroup<T>(<IFormlyGroup<T>>{ fields , model: model  });
      this.Forms.push(form);

    })
  }

 getFieldsCopy(fields: FormlyFieldConfig[]) {

   let ofields: FormlyFieldConfig[] = [];

   fields.forEach((item: FormlyFieldConfig) => {

     let field : FormlyFieldConfig = Helpers.CopyObjectWithoutKey(item, 'fieldGroup');
     if (!!item.fieldGroup && !!item.fieldGroup.length) {
       field.fieldGroup = this.getFieldsCopy(item.fieldGroup);
     }

     ofields.push(Object.assign({}, field));

   });

   return ofields;

 }


  get Size()
  {
    return this.Forms.length;
  }

  get Model() : T {

    let model = {};

    this.Forms.forEach((formlyGroup: IFormlyGroup<T>) => {

      model = Object.assign(model, formlyGroup.model);

    })

    return model as T;
  }
}
