import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

import { IFormlyGroup } from './IFormlyGroup';


export class FormlyGroup<T> implements IFormlyGroup<T> {

  model: T;
  options: FormlyFormOptions;
  fields: FormlyFieldConfig[];
  form: FormGroup;

  constructor(ops? : IFormlyGroup<T>) {
    this.model = ops && ops.model || <T>{};
    this.options = ops && ops.options || <FormlyFormOptions>{};
    this.form = ops && ops.form || new FormGroup({});
    this.fields = ops && ops.fields || [];
  }

 

}
