
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { FieldGroups } from './FieldGroups'

export interface IFormlyGroup<T> {
  model?: T;
  options?: FormlyFormOptions;
  fields?: FormlyFieldConfig[] | FieldGroups.GroupBase[];
  form?: FormGroup;

 
}
