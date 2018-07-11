
import { Component, ViewChild, ElementRef, Input, NgZone, AfterViewInit, Optional, Self } from '@angular/core';
import { ErrorStateMatcher, mixinErrorState, CanUpdateErrorState } from '@angular/material/core';
import { FileUploader } from 'ng2-file-upload';
import { ConvertToBase64, GetImageOrientation } from './utils/ConvertToBase64';
import { ImageResizerIO } from '../../views/root/shared/services/image-resizer-io/ImageResizerIO.service';
import { ControlValueAccessor, NgForm, NgControl, FormGroupDirective } from '@angular/forms';
import { Helpers } from '../../helpers/Helpers';
import ImageCompressor from 'image-compressor.js';

export class MatInputBase {
  constructor(public _defaultErrorStateMatcher: ErrorStateMatcher,
    public _parentForm: NgForm,
    public _parentFormGroup: FormGroupDirective,
    public ngControl: NgControl) { }
}
export const _MatInputMixinBase = mixinErrorState(MatInputBase);

@Component({
  selector: 'img-upload',
  templateUrl: 'img-upload.component.html',
  styleUrls: [
    'img-upload.component.css'
  ]
})
export class ImageUploadComponent extends _MatInputMixinBase  implements ControlValueAccessor, AfterViewInit {
 

  public uploader: FileUploader = new FileUploader({
    allowedMimeType: ['image/jpeg', 'image/png'],
    allowedFileType: ['png', 'jpeg']
    
  });

  @Input()
  private DisplayPreview = true;

  @Input('preview-flex-size')
  PreviewFlexSize = 100;

  @Input('thumbnail-actual-width')
  thumbnailActualWidth = 100;

  @Input('thumbnail-actual-height')
  thumbnailActualHeight = 100;
  
  @Input('aspect-ratio-width')
  aspectRatioWidth = 2;

  @Input('aspect-ratio-height')
  aspectRatioHeight = 1;


  @ViewChild('inputFile')
  private inputFile: ElementRef;

  $imgId: string;

  _disabled = false;
  Loading = false;
  private HasImage = false;
  private style = {
    'background-position': 'center center',
    'background-size': 'cover'
  };

  private aspectRatioClass = 'none';

  propagateChange = (_: any) => { };
  propagateTouched = () => { };

  constructor(private zone: NgZone, private ImageResizerIO: ImageResizerIO, private element: ElementRef,
    _defaultErrorStateMatcher: ErrorStateMatcher,
    @Optional() _parentForm: NgForm,
    @Optional() _parentFormGroup: FormGroupDirective,
    @Optional() @Self() public ngControl: NgControl,
  ) {
    super(_defaultErrorStateMatcher, _parentForm, _parentFormGroup, ngControl);
    if (!!ngControl) {
      ngControl.valueAccessor = this;
    }
  }
  onClick() {
    (this.inputFile.nativeElement as HTMLInputElement).click();
  }
  fileSelected($event) {

    this.Loading = true;
    console.log($event);
    console.log($event[0]);

    this.ImageResizerIO.Upload($event[0]).then((response) => {
      this.Loading = false;
      if (response.success) {

        this.$imgId = response.response.id;
        this.propagateChange(this.$imgId);
        console.log(this.$imgId);
      }
      console.log(response);
    });

  }

  

  writeValue(value: any): void {
    if (!!value) {
      this.$imgId = value;
    }
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this._disabled = isDisabled;
    
  }

  ngAfterViewInit(): void {
  }

}
