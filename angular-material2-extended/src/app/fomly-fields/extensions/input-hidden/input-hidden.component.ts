import { Component, OnInit, ViewChild } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { MatInput } from '@angular/material/input';
import { FormlyErrorStateMatcher } from '../formly.error-state-matcher';

@Component({
  selector: 'formly-field-mat-input',
  template: `
    <input matInput
      [type]="type"
      [errorStateMatcher]="errorStateMatcher"
      [formControl]="formControl" [hidden]="true"
      [formlyAttributes]="field">
  `,
})
export class HiddenFieldComponent extends FieldType implements OnInit {
  @ViewChild(MatInput) matInput: MatInput;
  errorStateMatcher = new FormlyErrorStateMatcher(this);

   get type() {
    return this.to.type || 'text';
  }

  ngOnInit() {
    if (this.field['__formField__']) {
      this.field['__formField__']._control = this.matInput;
    }
  }
}
