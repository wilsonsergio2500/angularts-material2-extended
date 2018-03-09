

import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs } from '@angular/http';
import { IImageResizerIOResponse } from './IImageResizerIOResponse';

@Injectable()
export class ImageResizerIO {

  constructor(private Http: Http) {

  }

  Upload(file: File) : Promise<IImageResizerIOResponse> {

    let formdata = new FormData();
    formdata.append('file', file);

    return new Promise<IImageResizerIOResponse>((resolve, reject) => {

      this.Http.post('https://api.imageresizer.io/v1/images?key=52e46719889fd0d110da2c14d00dadc1ac491ac1&with_exif=true&with_mini_preview=true', formdata).subscribe((response) => {
        resolve(response.json() as IImageResizerIOResponse);
      },
        reject
      );


    });


  }

  Delete(id: string) : Promise<any> {

    const path = `https://api.imageresizer.io/v1/images/${id}/delete?key=52e46719889fd0d110da2c14d00dadc1ac491ac1`;

    return new Promise<any>((resolve, reject) => {

      this.Http.get(path).subscribe((response) => { resolve(response.json) }, reject);

    })
      
  }


}
