
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup, AbstractControl, FormGroupDirective, NgForm } from '@angular/forms';

export namespace Fields {


  const types = {
    INPUT: 'input',
    TEXT_AREA: 'textarea',
    SELECT: 'select',
    RADIO: 'radio',
    CHECKBOX: 'checkbox',
    MULTI_CHECKBOX: 'multicheckbox'
  }

  export interface IFormlyTemplateOptions {
    type?: string;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    options?: any[];
    rows?: number;
    cols?: number;
    description?: string;
    hidden?: boolean;
    max?: number;
    min?: number;
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    required?: boolean;
    tabindex?: number;
    step?: number;
    focus?: Function;
    blur?: Function;
    keyup?: Function;
    keydown?: Function;
    click?: Function;
    change?: Function;
    keypress?: Function;
    [additionalProperties: string]: any;
  }

  interface IFormlyValidator{
    expression: (formGroup : FormGroup) => boolean;
    message: (error, field: FormlyFieldConfig) => string;

  }
  interface IFormlyAsyncValidator{
     expression: (formGroup : FormGroup) => Promise<boolean>;
      message: (error, field: FormlyFieldConfig) => string;
  }

  export interface ISelectOption{
    label: string;
    value: string;
  }
  export interface IRadioOption{
    key: string | number;
    value: string;
  }

  class InputBase implements FormlyFieldConfig {
    key: string;
    type: string;
    templateOptions: IFormlyTemplateOptions;
    optionsTypes?: string[];
    defaultValue?: any;
    validation?: {
      messages?: {
        [messageProperties: string]: string | ((error, field: FormlyFieldConfig) => string);
      };
      show?: boolean;
      [additionalProperties: string]: any;
    };
    validators?: { [validatorProperty: string] : IFormlyValidator } 
    asyncValidators?: { [validatorAsyncProperty: string] : IFormlyAsyncValidator } 
    formControl?: AbstractControl;
     hideExpression?: boolean | string | ((model: any, formState: any) => boolean);
    className?: string;

    constructor(key: string, label: string, required: boolean = false) {
      this.key = key;
	  this.type = types.INPUT;
      this.templateOptions = <IFormlyTemplateOptions>{ label, required };

      const messages = {
        required: (error, field: FormlyFieldConfig) => {
          return `${field.templateOptions.label} is required`;
        }
      }

      if (required) {
        this.validation = { messages }
      }

    }

  }

  export class InputField extends InputBase{
      constructor(key: string, label: string, required: boolean = false) {
		super(key, label, required);
		this.templateOptions.type = 'text';

	  }
	}

  export class EmailField extends InputBase {
		constructor(key: string, label: string, required: boolean = false) {
            super(key, label, required);
            this.validators = {
                'email': {
                    expression: (formGroup : FormGroup) => {
                        let value = formGroup.value;
                        if(!!value){
                            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            return regex.test(value);
                        } else {
                          //if value should be handle by the required validator
                          return true;
                        }
                        
                    },
                    message: (error, field: FormlyFieldConfig) => {
                        return `${field.formControl.value} is not a valid Email Address` ;
                    }
                },
             
			  }
		}
	}

  export class NumberField extends InputBase{
     constructor(key: string, label: string, required: boolean = false){
       super(key, label, required);
       this.templateOptions.type = 'number';
     }
  }

  export class PasswordField extends InputBase {
        constructor(key: string, label: string) {
            super(key, label, true);
            this.templateOptions.type = 'password';
            
        }
    }

  export class SelectField extends InputBase{
    constructor(key: string, label: string, options: ISelectOption[], required : boolean = false){
      super(key, label, required);
      this.type =  types.SELECT;
      this.templateOptions.options = options;
    }
  }

  export class CheckBoxField extends InputBase{
    constructor(key: string, label: string){
      super(key, label, false);
      this.type = types.CHECKBOX;
      this.defaultValue = false;

    }
  }

  export class RadioField extends InputBase{
    constructor(key: string, label: string, options: IRadioOption[]){
      super(key, label, true);
      this.type = types.RADIO;
      
      this.templateOptions.options = options;

    }
  }
}
