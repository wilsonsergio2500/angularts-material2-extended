
import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import IMask from 'imask';

export interface IMdMaskConfig {
  mask: string;
  lazy: boolean;
}
const IsObject = (value: any) => {
  return (value === null) ? false : (typeof value === 'object');
}

/**
 * usage:
<input matInput [placeholder]="placeholder" [md-mask]="'000-00-0000'" />
 */

@Directive({
  selector: '[md-mask]',
})
export class MdMasskDirective implements OnInit {

  _maskConfig: IMdMaskConfig = <IMdMaskConfig>{ lazy: false};
  @Input('md-mask')
  set mask(value: any){
    const IsObj = IsObject(value);
    if (IsObj) {

      const hasmask = (value as Object).hasOwnProperty('mask');
      const haslazy = (value as Object).hasOwnProperty('lazy');
      this._maskConfig.mask = (hasmask) && (value as IMdMaskConfig).mask;
      this._maskConfig.lazy = (haslazy) && (value as IMdMaskConfig).lazy;

    } else {
      
      this._maskConfig.mask = (!!value) && value;
      
    }
  }
  

  constructor(private elementRef: ElementRef) {

    const IsInput = this.elementRef.nativeElement instanceof HTMLInputElement;
    if (!IsInput) {
      throw "md-mask directive must be attached to input element";
    }
    console.log(this.elementRef);
  }

  ngOnInit() {

    const Input = new IMask(this.elementRef.nativeElement, this._maskConfig);

  }

}
