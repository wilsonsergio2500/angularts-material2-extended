import { Http } from '@angular/http';
import { Component } from '@angular/core';
import { FormlyGroup } from '../../../../fomly-fields/FormlyGroup';
import { IFormlyGroup } from '../../../../fomly-fields/IFormlyGroup';
import { Fields } from '../../../../fomly-fields/Fields';
import { FieldGroups  } from '../../../../fomly-fields/FieldGroups';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

import { Observable } from 'rxjs/Observable';

export interface IModelExample{
    
  zipcode: string;
}

@Component({
  selector: 'formly-async-validator',
  templateUrl: 'formly-async-validator.component.html'
})
export class FormlyAsyncValidatorComponent{

  formlyGroup : IFormlyGroup<IModelExample>;
  constructor(private http: Http){
        this.formlyGroup = new FormlyGroup<IModelExample>();

        const zipcode =  new Fields.NumberField('zipcode', 'Zip Code', true);
        zipcode.modelOptions = { debounce: { default: 250 } };
        zipcode.asyncValidators = {
          valid : {
            expression: (formGroup : FormGroup) => {

              this.formlyGroup.IsAsyncValidating = true;

              return new Promise<boolean>((resolve, reject) => {
                  this.http.get(`http://ziptasticapi.com/${formGroup.value}`)
                    .toPromise().then((r) => {
                        const json = r.json();
                        if(!!json.error){
                          resolve(false);
                        } else {
                          resolve(true);
                        }

                      this.formlyGroup.IsAsyncValidating = false;
                    })
              })

            },
            message: (error, field: FormlyFieldConfig) => {
              return `${field.templateOptions.label} ${field.formControl.value} is Invalid`
            }
          }
        }

        this.formlyGroup.fields = [zipcode];

        
        
  }

}
