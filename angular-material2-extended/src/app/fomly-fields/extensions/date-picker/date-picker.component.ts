

import { Component, OnInit, ViewChild} from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { MatInput } from '@angular/material/input';
import { FormlyErrorStateMatcher } from '../formly.error-state-matcher';

@Component({
    selector: 'formly-field-mat-date-picker',
    templateUrl: 'date-picker.component.html',
    styles: [`
        :host input{
          width: 92%;
        }
      
      `]
    
})
export class DatePickerComponent extends FieldType implements OnInit{
   @ViewChild(MatInput) matInput: MatInput;
  errorStateMatcher = new FormlyErrorStateMatcher(this);

   get type() {
    return  'text';
  }

  ngOnInit() {

    if (this.field['__formField__']) {
      this.field['__formField__']._control = this.matInput;
    }
  }

  _keyPress(event: any) {
    const pattern = /^[0-9]*$/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }

}
