
import { Fields } from '../../../../../fomly-fields/Fields';
import { FormlyGroup } from '../../../../../fomly-fields/FormlyGroup';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';


const bio = new Fields.EditorField('bio', 'Bio', true);

export const StepBio = [
  bio
];

