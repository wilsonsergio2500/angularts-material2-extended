
import { Fields } from '../../../../../fomly-fields/Fields';
import { FormlyGroup } from '../../../../../fomly-fields/FormlyGroup';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';


const bio = new Fields.EditorField('bio', 'Bio', true);
bio.templateOptions.placeholder = 'Enter Bio..';
bio.templateOptions.editor.height = 130;

export const StepBio = [
  bio
];

