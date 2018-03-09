
interface IImageResizeResponseDetail {
  id: string;
  width: number;
  height: number;
  filesize: number;
  mini_preview: string;
  tags: string[];
}

export interface IImageResizerIOResponse {
  success: boolean;
  response: IImageResizeResponseDetail;
}
