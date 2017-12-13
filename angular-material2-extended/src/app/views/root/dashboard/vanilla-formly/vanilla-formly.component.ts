
import { Component } from '@angular/core'
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'vanilla-formly',
  templateUrl: 'vanilla-formly.component.html'
})
export class VanillaFormlyComponent{
  form: FormGroup;
  model: any;
  fields: FormlyFieldConfig[];
  constructor(){

    this.form = new FormGroup({});
    this.model = {};

    const messages = {
        required: (error, field: FormlyFieldConfig) => {
          return field.templateOptions.label + ' is required';
        }
      }

    this.fields = [
      {
        key: 'text',
        type: 'input',
        
        templateOptions: {
          label: 'Text 1',
          placeholder: 'enter an item',
          required: true

        },
        validation: { messages }
         
      },
      {
        key: 'email',
        type: 'input',
        
        templateOptions: {
          label: 'Email',
          required: true

        },
        validation: { messages },
        validators : {
                //'required': {
                //    expression: (formGroup : FormGroup) => {
                //      return (!!formGroup.value);
                //    },
                //    message: (item: any, formlyConfig: FormlyFieldConfig) => {
                      
                //        return `${formlyConfig.templateOptions.label} is required` ;
                //    }
                //},
                'email': {
                   expression: (FormGroup: FormGroup) => {
                        let value = FormGroup.value;
                        if(!!value) {
                          let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                          return regex.test(value);

                          }
                        return true;
                   },
                    message: (item: any, formlyConfig: FormlyFieldConfig) => {
                      return `${formlyConfig.formControl.value} is not a valid Email Address` ;
                  }
                }
			  }
        
      },
      {
        key: 'password',
        type: 'input',
        templateOptions: {
          label: 'Password',
          type: 'password',
          required: true
        },
        validation: { messages },
      }
      ];

  }

  submit() {
    console.log(this.model);
  }

}
