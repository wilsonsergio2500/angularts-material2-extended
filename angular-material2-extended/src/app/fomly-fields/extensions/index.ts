
import { DatePickerComponent } from './date-picker/date-picker.component';
import { FormlyQuillEditorComponent } from './ngx-quill/formly-quill.component';
import { HiddenFieldComponent } from './input-hidden/input-hidden.component';
import { ConfigOption } from '@ngx-formly/core';
import { FormlyWrapperFormField } from './wrappers/formly-field-wrapper';
import { ImageUploadFieldComponent } from './img-upload-field/img-upload-field.component';


export const FORMLY_CONTROLS_CONFIG : ConfigOption = {
  types: [
    {
      name: 'datepicker',
      component: DatePickerComponent,
      wrappers: ['form-field']
    },
    {
      name: 'editor',
      component: FormlyQuillEditorComponent,
      wrappers: ['form-field'],
      defaultOptions: {
        templateOptions: {
          height: 100
        }
      }
      
    },
    {
      name: 'image-upload',
      component: ImageUploadFieldComponent,
    },
    {
      name: 'hidden',
      component: HiddenFieldComponent
    }
    ],
  wrappers: [
    { name: 'form-field', component: FormlyWrapperFormField },
  ],
  manipulators: [],
}

export const FORMLY_CONTROLS_COMPONENTS = [
    DatePickerComponent,
    FormlyQuillEditorComponent,
    HiddenFieldComponent,
    ImageUploadFieldComponent,
    FormlyWrapperFormField
  ]
