
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

export interface IFormlyGroup<T> {
  model?: T;
  options?: FormlyFormOptions;
  fields?: FormlyFieldConfig[];
  form?: FormGroup;

 
}
