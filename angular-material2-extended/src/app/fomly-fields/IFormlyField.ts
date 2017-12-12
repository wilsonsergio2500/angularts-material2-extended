
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

export interface IFormlyField<T> {
  model?: T;
  options?: FormlyFormOptions;
  fields?: FormlyFieldConfig[];
  form?: FormGroup;

 
}
