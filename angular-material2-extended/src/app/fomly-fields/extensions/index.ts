
import { DatePickerComponent } from './date-picker/date-picker.component';
import { ConfigOption } from '@ngx-formly/core';
import { FormlyWrapperFormField } from './wrappers/formly-field-wrapper';


export const FORMLY_CONTROLS_CONFIG : ConfigOption = {
  types: [
    {
      name: 'datepicker',
      component: DatePickerComponent,
      wrappers: ['form-field']
    }
    ],
  wrappers: [
    { name: 'form-field', component: FormlyWrapperFormField },
  ],
  manipulators: [],
}

export const FORMLY_CONTROLS_COMPONENTS = [
    DatePickerComponent,

   
    FormlyWrapperFormField
  ]
