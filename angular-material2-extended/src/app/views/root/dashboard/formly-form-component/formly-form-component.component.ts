
import { Component } from '@angular/core';
import {fields} from './json-form-file';
import { FormlyGroup} from '../../../../fomly-fields/FormlyGroup';

@Component({
  selector: 'formly-form-view',
  templateUrl: 'formly-form-component.component.html'
})
export class FormlyFormViewComponent{

  working: boolean = false;
  formlyGroup: FormlyGroup<any> = new FormlyGroup<any>({ fields });
  constructor(){

    this.formlyGroup.MarkConstrlsAsPristine();

  }

  formSubmit(model: any){

    console.log(model);

    this.working = true;

    setTimeout(() => {
      this.working = false;
    }, 10000)
  }
}
