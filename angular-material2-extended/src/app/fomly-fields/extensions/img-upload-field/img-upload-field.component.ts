import { Component, OnInit, ViewChild } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { FormlyErrorStateMatcher } from '../formly.error-state-matcher';
import { ImageUploadComponent } from '../../../components/img-upload/img-upload.component';

@Component({
  selector: 'formly-field-img-upload',
  templateUrl: 'img-upload-field.component.html'
})

export class ImageUploadFieldComponent extends FieldType implements OnInit {
  @ViewChild(ImageUploadComponent) formFieldControl: ImageUploadComponent;
  errorStateMatcher = new FormlyErrorStateMatcher(this);

  get type() {
    return this.to.type || 'text';
  }

  ngOnInit() {
    if (this.field['__formField__']) {
      this.field['__formField__']._control = this.formFieldControl;
    }
  }
}
