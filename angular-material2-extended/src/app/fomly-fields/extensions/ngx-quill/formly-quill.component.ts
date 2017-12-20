

import { Component, OnInit, ViewChild, DoCheck } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { MatInput } from '@angular/material/input';
import { FormlyErrorStateMatcher } from '../formly.error-state-matcher';
import { QuillEditorComponent } from '../../../components/ngx-quill/quill-editor.component';

@Component({
  selector: 'formly-quill-editor',
  templateUrl: 'formly-quill.component.html'
})
export class FormlyQuillEditorComponent extends FieldType implements OnInit {
  @ViewChild(QuillEditorComponent) editor: QuillEditorComponent;
  errorStateMatcher = new FormlyErrorStateMatcher(this);

  get type() {
    return  'text';
  }

  ngOnInit() {

    if (this.field['__formField__']) {
      this.field['__formField__']._control = this.editor;
    }
  }
}
