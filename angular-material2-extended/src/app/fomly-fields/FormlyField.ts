import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

import { IFormlyField } from './IFormlyField';


export class FormlyField<T> implements IFormlyField<T> {

  model: T;
  options: FormlyFormOptions;
  fields: FormlyFieldConfig[];
  form: FormGroup;

  constructor(ops? : IFormlyField<T>) {
    this.model = ops.model || <T>{};
    this.options = ops.options || <FormlyFormOptions>{};
    this.form = ops.form || new FormGroup({});
    this.fields = ops.fields || [];
  }

 

}
