import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Field } from '@ngx-formly/core';

export class FormlyErrorStateMatcher implements ErrorStateMatcher {
  constructor(private field: Field) {}

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return this.field && this.field.showError;
  }
}
