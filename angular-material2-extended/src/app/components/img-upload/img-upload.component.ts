
import { Component, ViewChild, ElementRef, Input, NgZone, AfterViewInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ConvertToBase64, GetImageOrientation } from './utils/ConvertToBase64';
import { ImageResizerIO } from '../../views/root/shared/services/image-resizer-io/ImageResizerIO.service';
import { ControlValueAccessor } from '@angular/forms';
import { Helpers } from '../../helpers/Helpers'

@Component({
  selector: 'img-upload',
  templateUrl: 'img-upload.component.html',
  styleUrls: [
    'img-upload.component.css'
  ]
})
export class ImageUploadComponent implements ControlValueAccessor, AfterViewInit {



 

  public uploader: FileUploader = new FileUploader({
    allowedMimeType: ['image/jpeg', 'image/png'],
    allowedFileType: ['png', 'jpeg']
  });

  @Input()
  private DisplayPreview = true;

  @Input('PreviewWidth')
  private PreviewWidth = '50px';

  @Input('thumbnail-actual-width')
  private thumbnailActualWidth = 100;

  @Input('thumbnail-actual-height')
  private thumbnailActualHeight = 100;
  
  @Input('aspect-ratio-width')
  private aspectRatioWidth = 2;

  @Input('aspect-ratio-height')
  private aspectRatioHeight = 1;


  @ViewChild('inputFile')
  private inputFile: ElementRef;



  private $imgId: string;

  private _disabled = false;
  private Loading = false;
  private HasImage = false;
  private style = {
    'background-position': 'center center',
    'background-size': 'cover'
  };

  private aspectRatioClass = 'none';

  propagateChange = (_: any) => { };
  propagateTouched = () => { };

  constructor(private zone: NgZone, private ImageResizerIO: ImageResizerIO, private element: ElementRef ) {
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

      }
      console.log(response);
    });

  }

  

  getUrlTemplate() {
    const width = parseInt(this.PreviewWidth);
    const height = width * this.aspectRatioHeight;
    return `https://im.ages.io/${this.$imgId}?size=${width}x${height}&quality=50`
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