
import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { exportPropGetter } from '@firebase/database/dist/esm/src/core/util/util';
import { Helpers } from '../../helpers/Helpers';
import { validateArgCount } from '@firebase/util/dist/esm/src/validation';
import { Promise } from 'q';

/**
 * usage:
 *    <image-rio-loader [actual-width]="300" [actual-height]="200" image-id="intl1"
                          aspect-ratio-width="2" aspect-ratio-height="1"
                          delay-show="200" missing-image-id="dSaintlp"></image-rio-loader>
 */

@Component({

  selector: 'image-rio-loader',
  templateUrl: 'image-rio-loader.component.html',
  styleUrls: [`image-rio-loader.component.css`]

})

export class ImageRioLoader implements OnInit, AfterViewInit {
  
 

  @Input('actual-width')
  private actualWidth = 100;

  @Input('actual-height')
  private actualHeight = 100;

  @Input('image-quality')
  private imageQuality = 50;

  @Input('aspect-ratio-width')
  private aspectRatioWidth = 2;

  @Input('aspect-ratio-height')
  private aspectRatioHeight = 1;

  @Input('image-id')
  set ImageId(value: string) {

    this._imageId = value;
    setTimeout(this.bindImage.bind(this), 50)
  
  }

  @Input('missing-image-id')
  private missingImageId = null;

  @Input('delay-show')
  private delayShow = 1;

  @Input('loading-spinner-diameter')
  private loadingdiameter = 25;

  private _imageId = null;
  private aspectRatioClass = 'none';
  private style = {
    'background-position': 'center center',
    'background-size': 'cover'
  };
  private Loading = true;

  constructor() {
   
  }

  cacheImage(src: string): Promise<any> {

    return Promise<any>((resolve, reject) => {

      let img = new Image();
      img.src = src;
      img.onload = () => {
        resolve(src);
      }
      img.onerror = (e) => {
        reject(e);
      }

    });
  }

  ngOnInit(): void {
    this.bindAspectRatio();
  }

  ngAfterViewInit(): void {
  }

  bindImage() {

    this.Loading = true;

    const id = (this._imageId) || (this.missingImageId);
    if (!!id) {
      const bimage = this.getUrlTemplate(id);

      this.cacheImage(bimage).then((x: string) => {

        setTimeout(() => {
          this.style['background-image'] = `url(${bimage})`;
          this.Loading = false;
        }, this.delayShow);
      });
    }
  }

  bindAspectRatio() {
    const cname = Helpers.CreateAspecRatioStyle(this.aspectRatioWidth, this.aspectRatioHeight);
    this.aspectRatioClass = cname;
  }

  getUrlTemplate(id: string) {

    return `https://im.ages.io/${id}?size=${this.actualWidth}x${this.actualHeight}&quality=${this.imageQuality}`
  }

}

