
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup, AbstractControl, FormGroupDirective, NgForm } from '@angular/forms';

export namespace FieldGroups{

	export class GroupBase implements FormlyFieldConfig{

      className?: string;
      fieldGroupClassName?: string;
      fieldGroup?: FormlyFieldConfig[];
      fieldArray?: FormlyFieldConfig;
	  template?: string;

	  constructor(){
		  this.fieldGroupClassName = 'row';
      this.className= 'col-md-12'
		  this.fieldGroup = [];
	  }
	}

	export class Group2 extends GroupBase{
	   constructor(field1: FormlyFieldConfig | GroupBase, field2: FormlyFieldConfig | GroupBase){
		 super();
		  field1.className = 'col-md-6 col-xs-12';
		  field2.className = 'col-md-6 col-xs-12';
		  this.fieldGroup = [field1, field2];
	   }
	}

	export class Group3 extends GroupBase{
		 constructor(field1: FormlyFieldConfig | GroupBase, field2: FormlyFieldConfig | GroupBase, field3: FormlyFieldConfig | GroupBase){
			super();
			field1.className = 'col-md-4 col-xs-12';
			field2.className = 'col-md-4 col-xs-12';
			field3.className = 'col-md-4 col-xs-12';
			this.fieldGroup = [field1, field2, field3];
		 }
	}

  export class GroupRow extends GroupBase{
      constructor(fields: FormlyFieldConfig[] | GroupBase[]){
        super();
        this.fieldGroup = fields;
      }
  }

  export class Template implements FormlyFieldConfig{
    template: string;
    className?: string;
      constructor(template: string){
         
        this.template = template;
      }
  }

}
