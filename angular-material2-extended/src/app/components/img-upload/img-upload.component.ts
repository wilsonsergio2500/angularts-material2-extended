
import { Component, ViewChild, ElementRef, Input, NgZone } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { ConvertToBase64, GetImageOrientation } from './utils/ConvertToBase64';

const ORIENT_TRANSFORMS = {
  1: '',
  2: 'rotateY(180deg)',
  3: 'rotate(180deg)',
  4: 'rotate(180deg) rotateY(180deg)',
  5: 'rotate(270deg) rotateY(180deg)',
  6: 'rotate(90deg)',
  7: 'rotate(90deg) rotateY(180deg)',
  8: 'rotate(270deg)'
};
const ORIENT_TRANSFORMS1 = {
  1: '',
  2: 'rotateY(180deg)',
  3: 'rotate(180deg)',
  4: 'rotate(180deg) rotateY(180deg)',
  5: 'rotate(270deg) rotateY(180deg)',
  6: 'rotate(90deg)',
  7: 'rotate(90deg) rotateY(180deg)',
  8: 'rotate(270deg)'
};

@Component({
  selector: 'img-upload',
  templateUrl: 'img-upload.component.html',
  styleUrls: [
    'img-upload.component.css'
  ]
})
export class ImageUploadComponent {

  public uploader: FileUploader = new FileUploader({ allowedMimeType: ['image/jpeg', 'image/png'] });

  @Input()
  private DisplayPreview = true;
  @Input()
  private PreviewWidth = 50;

  @ViewChild('inputFile')
  private inputFile: ElementRef;

  private Loading = false;
  private HasImage = false;
  private style = {
    'background-position': 'center center',
    'background-size': 'cover'
  };

  constructor(private zone: NgZone) {
  }
  onClick() {
    (this.inputFile.nativeElement as HTMLInputElement).click();
  }
  fileSelected($event) {

    this.Loading = true;

    const p1 = ConvertToBase64($event[0]);
    const p2 = GetImageOrientation($event[0]);
    Promise.all([p1, p2]).then((R) => {

      this.HasImage = true;

      setTimeout(() => {

        this.Loading = false;
        this.style['background-image'] = `url(${R[0]})`;
        //this.style['transform'] = ORIENT_TRANSFORMS[R[1]];

      }, 350);

      console.log(R);
    });




    console.log($event);
  }


}
