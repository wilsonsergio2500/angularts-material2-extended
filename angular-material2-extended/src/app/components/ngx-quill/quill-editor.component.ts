import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  Output,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation,
  Optional,
  Self,
  
  
} from '@angular/core';
import {ErrorStateMatcher, mixinErrorState, CanUpdateErrorState} from '@angular/material/core';
import {MatFormFieldControl} from '@angular/material/form-field';
import {FormGroupDirective, NgControl, NgForm} from '@angular/forms';
import { FieldType } from '@ngx-formly/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import  'rxjs/add/observable/from';
import 'rxjs/add/operator/distinctUntilChanged';
import {of} from 'rxjs/observable/of';


import {
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  ControlValueAccessor,
  Validator
} from '@angular/forms';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import {Subject} from 'rxjs/Subject';

import * as QuillNamespace from 'quill';
let Quill: any = QuillNamespace;

export interface CustomOption {
  import: string;
  whitelist: Array<any>;
}

export class MatInputBase {
  constructor(public _defaultErrorStateMatcher: ErrorStateMatcher,
              public _parentForm: NgForm,
              public _parentFormGroup: FormGroupDirective,
              public ngControl: NgControl) {}
}
export const _MatInputMixinBase = mixinErrorState(MatInputBase);


@Component({
  selector: 'quill-editor',
  template: `
  <ng-content select="[quill-editor-toolbar]"></ng-content>
`,
  //providers: [{
  //  provide: NG_VALUE_ACCESSOR,
  //  useExisting: forwardRef(() => QuillEditorComponent),
  //  multi: true
  //}, {
  //  provide: NG_VALIDATORS,
  //  useExisting: forwardRef(() => QuillEditorComponent),
  //  multi: true
  //}],
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    `../../../../node_modules/quill/dist/quill.snow.css`,
     `../../../../node_modules/quill/dist/quill.bubble.css`
    ]
})
export class QuillEditorComponent extends  _MatInputMixinBase  implements  AfterViewInit, ControlValueAccessor, OnChanges, Validator, CanUpdateErrorState   {



  quillEditor: any;
  editorElem: HTMLElement;
  emptyArray: any[] = [];
  content: any;
  defaultModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': this.emptyArray.slice() }, { 'background': this.emptyArray.slice() }],          // dropdown with defaults from theme
      [{ 'font': this.emptyArray.slice() }],
      [{ 'align': this.emptyArray.slice() }],

      ['clean'],                                         // remove formatting button
      ['link', 'image', 'video']                         // link and image, video
    ]
  };

  @Input() theme: string;
  @Input() modules: { [index: string]: Object };
  @Input() readOnly: boolean;
  @Input() placeholder: string;
  @Input() maxLength: number;
  @Input() minLength: number;
  @Input() required: boolean;
  @Input() formats: string[];
  @Input() style: any = {};
  @Input() strict: boolean = true;
  @Input() scrollingContainer: HTMLElement | string;
  @Input() bounds: HTMLElement | string;
  @Input() customOptions: CustomOption[] = [];

  _disabled: boolean;

  @Input('disabled')
    get disabled() { return this.ngControl ? this.ngControl.disabled : this._disabled; }
    set disabled(disable: boolean){
    //console.log('disabled')
    this._disabled = disable;
    //if(!!disable){
    //  setTimeout(() => {
    //    this.quillEditor.disable();
    //  }, 50)
    //} else {
    //   setTimeout(() => {
    //    this.quillEditor.enable();
    //  }, 50)
    //}
   
  }

  @Output() onEditorCreated: EventEmitter<any> = new EventEmitter();
  @Output() onContentChanged: EventEmitter<any> = new EventEmitter();
  @Output() onSelectionChanged: EventEmitter<any> = new EventEmitter();

  onModelChange: Function = () => {};
  onModelTouched: Function = () => {};

  constructor(private elementRef: ElementRef, @Inject(DOCUMENT) private doc: any, private renderer: Renderer2, _defaultErrorStateMatcher: ErrorStateMatcher,
              @Optional() _parentForm: NgForm,
              @Optional() _parentFormGroup: FormGroupDirective,
               @Optional() @Self() public ngControl: NgControl,
    ) {
    super(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl);
    ngControl.valueAccessor = this;
      // this._inputValueAccessor = inputValueAccessor || this._elementRef.nativeElement;
  }

   stateChanges = new Subject<void>();

  ngAfterViewInit() {
    const toolbarElem = this.elementRef.nativeElement.querySelector('[quill-editor-toolbar]');
    let modules: any = this.modules || this.defaultModules;
    let placeholder = 'Insert text here ...';

    if (this.placeholder !== null && this.placeholder !== undefined) {
      placeholder = this.placeholder.trim();
    }

    if (toolbarElem) {
      modules['toolbar'] = toolbarElem;
    }
    this.elementRef.nativeElement.insertAdjacentHTML('beforeend', '<div quill-editor-element></div>');
    this.editorElem = this.elementRef.nativeElement.querySelector('[quill-editor-element]');

    if (this.style) {
      Object.keys(this.style).forEach((key: string) => {
        this.renderer.setStyle(this.editorElem, key, this.style[key]);
      });
    }

    this.customOptions.forEach(customOption => {
      const newCustomOption = Quill.import(customOption.import);
      newCustomOption.whitelist = customOption.whitelist;
      Quill.register(newCustomOption, true);
    });

    this.quillEditor = new Quill(this.editorElem, {
      modules: modules,
      placeholder: placeholder,
      readOnly: this.readOnly || false,
      theme: this.theme || 'snow',
      formats: this.formats,
      bounds: this.bounds || this.doc.body,
      strict: this.strict,
      scrollingContainer: this.scrollingContainer
    });

    if (this.content) {
      const contents = this.quillEditor.clipboard.convert(this.content);
      this.quillEditor.setContents(contents);
      this.quillEditor.history.clear();
    }

    this.onEditorCreated.emit(this.quillEditor);

    // mark model as touched if editor lost focus
    this.quillEditor.on('selection-change', (range: any, oldRange: any, source: string) => {
      this.onSelectionChanged.emit({
        editor: this.quillEditor,
        range: range,
        oldRange: oldRange,
        source: source
      });

      if (!range) {
        this.onModelTouched();
      }
    });

    // update model if text changes
    this.quillEditor.on('text-change', (delta: any, oldDelta: any, source: string) => {
      let html: (string | null) = this.editorElem.children[0].innerHTML;
      const text = this.quillEditor.getText();

      if (html === '<p><br></p>') {
          html = null;
      }

      this.onModelChange(html);
      this.stateChanges.next();
     

      this.onContentChanged.emit({
        editor: this.quillEditor,
        html: html,
        text: text,
        delta: delta,
        oldDelta: oldDelta,
        source: source
      });
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['readOnly'] && this.quillEditor) {
      this.quillEditor.enable(!changes['readOnly'].currentValue);
    }
    this.stateChanges.next();
  }

  writeValue(currentValue: any) {
    this.content = currentValue;

    if (this.quillEditor) {
      if (currentValue) {
        this.quillEditor.setContents(this.quillEditor.clipboard.convert(this.content));
        return;
      }
      this.quillEditor.setText('');
    }
  }

  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }

  validate() {
    if (!this.quillEditor) {
      return null;
    }

    let err: {
      minLengthError?: {given: number, minLength: number};
      maxLengthError?: {given: number, maxLength: number};
      requiredError?: {empty: boolean}
    } = {},
    valid = true;

    const textLength = this.quillEditor.getText().trim().length;

    if (this.minLength && textLength && textLength < this.minLength) {
      err.minLengthError = {
        given: textLength,
        minLength: this.minLength
      };

      valid = false;
    }

    if (this.maxLength && textLength > this.maxLength) {
      err.maxLengthError = {
        given: textLength,
        maxLength: this.maxLength
      };

      valid = false;
    }

    if (this.required && !textLength) {
      err.requiredError = {
        empty: true
      };

      valid = false;
    }

    return valid ? null : err;
  }

  _ariaDescribedby: string;
   setDescribedByIds(ids: string[]) { this._ariaDescribedby = ids.join(' '); }

  ngOnDestroy() {
    this.stateChanges.complete();
    this.disabledSubscription.unsubscribe();
    
  }

   @Input() errorStateMatcher: ErrorStateMatcher;

  ngDoCheck() {
    if (this.ngControl) {
      // We need to re-evaluate this on every change detection cycle, because there are some
      // error triggers that we can't subscribe to (e.g. parent form submissions). This means
      // that whatever logic is in here has to be super lean or we risk destroying the performance.
      //console.log(this.disabled)
      this.updateErrorState();
    } else {
      // When the input isn't used together with `@angular/forms`, we need to check manually for
      // changes to the native `value` property in order to update the floating label.
      this._dirtyCheckNativeValue();
    }
  }

   protected _dirtyCheckNativeValue() {
    //const newValue = this.value;

    //if (this._previousNativeValue !== newValue) {
    //  this._previousNativeValue = newValue;
    //  this.stateChanges.next();
    //}
  }


  disabledSubscription: Subscription;
  ngOnInit() {

    const tracker : Observable<any> = Observable.create((observer) => {

      let value = null;

      const interval = setInterval(() =>{
        if (value != this.disabled){
            value = this.disabled;
            observer.next(value);
          }
      }, 250)

      return () => clearInterval(interval);

    });
    
    

    this.disabledSubscription = tracker.subscribe((val) => {
      if(!!val){
        this.quillEditor.disable();
      }
      else {
        this.quillEditor.enable();
      }
    })
   
  }
}
