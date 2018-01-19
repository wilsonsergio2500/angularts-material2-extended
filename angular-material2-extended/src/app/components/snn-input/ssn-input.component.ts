
import { Component, Input, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  ControlValueAccessor,
  Validator
} from '@angular/forms';
import { MatInput } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/forkJoin';

import 'rxjs/add/observable/merge';

const ARROWS = {
  RIGHT: "ArrowRight",
  LEFT: "ArrowLeft",
  UP: "ArrowUp",
  DOWN: "ArrowDown",
  HOME: "Home",
  END: "End"
};

const delay = (call: () => void, ms: number = 1): Promise<void> => {
  const dl = new Promise<void>((rs) => setTimeout(rs, ms));
  return dl.then(call);
}

const mask: string[] = ['_', '_', '_', '-', '_', '_', '-', '_', '_', '_', '_'];
const EMPTY_MASK = '___-__-____';
const HIDE_CHARACTER = '*';

@Component({
  selector: 'ssn-input',
  templateUrl: 'ssn-input.component.html',

})

export class SsnInputComponet implements ControlValueAccessor, OnInit {

  private disabled: boolean;
  private $modelvalue = '';
  private $modelvalueArray: string[] = [];
  
  private $viewvalue: string = EMPTY_MASK;


  @Input() placeholder: string;
  @Input() HideValue : boolean  = false;

  @ViewChild('input')
  private inputElement: ElementRef;


  constructor(private elementRef: ElementRef) {

  }


  writeValue(value: string): void {
    if (!!value) {
      this.$modelvalue = value;
      this.$modelvalueArray = this.$modelvalue.split('');
      this.$viewvalue = this.getMask(this.$modelvalueArray);
    }
    
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  propagateChange = (_: any) => { };

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() { }

  getCursor(value: string) {
    const array = value.split('').reverse();
    const find = array.findIndex((g, index: number) => (g === HIDE_CHARACTER || isNaN(parseInt(g, 10)) === false));
    const pos = (find < 0) ? 0 : array.length - find;

    return pos;
  }
  setCursorPosition(input: HTMLInputElement) {
    const pos = this.getCursor(input.value);
    setTimeout(() => input.setSelectionRange(pos, pos));
  }
  getMask(vals: string[], hidden = false) {
    const msk = [...mask];
    let counter = 0;
    mask.map((item: string, index: number) => ({ item, index }))
      .filter((el) => el.item !== '-')
      .forEach((el) => {
        if (vals.length) {
          msk[el.index] = (!!vals[counter]) ? ( (hidden) ? HIDE_CHARACTER : vals[counter]) : mask[el.index];
          counter++;
        }

      });
    return msk.join('');
  }

  $setModel() {

    this.$modelvalue = this.$modelvalueArray.join('');
    this.propagateChange(this.$modelvalue);

    console.log(this.HideValue);

    //console.log(this.$modelvalue);
  }

  async updateView(input: HTMLInputElement) {

    await delay(() => this.$viewvalue = this.getMask(this.$modelvalueArray, this.HideValue));
    await delay(() => this.setCursorPosition(input), 2);
    await delay(this.$setModel.bind(this), 2);


  }

  ngOnInit() {

    const el = this.inputElement.nativeElement;

    const $keydownEvent = Observable.fromEvent(el, 'keydown')
      .map((event: KeyboardEvent) => {
        const numeric = (event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)
          || (event.keyCode === 8);
        const preventable = event.key === ARROWS.LEFT || event.key === ARROWS.RIGHT || event.key === ARROWS.HOME
          || event.key === ARROWS.END
          || event.key === ARROWS.UP
          || event.key === ARROWS.DOWN
          || numeric === false;
          

        if (preventable) {
          return event;
        }
      }
    ).do((event: Event) => (event) && event.preventDefault());


    const $clickEvent = Observable.fromEvent(el, 'click');
    const $focustEvent = Observable.fromEvent(el, 'focus');

    const $events = Observable.merge($clickEvent, $focustEvent)
      .do((event: KeyboardEvent) => {

        const input = (event.target as HTMLInputElement);
        this.setCursorPosition(input);
       
      });

    $keydownEvent.subscribe();
    $events.subscribe();

    const $keyUpEvent = Observable.fromEvent(this.inputElement.nativeElement, 'keyup')
      .do((event: KeyboardEvent) => {

        const input = (event.target as HTMLInputElement);
        const numeric = (event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105);

        if (numeric) {
          
          const value = (event.which >= 96 && event.which <= 105)
            ? String.fromCharCode(event.which - 48)
            : String.fromCharCode(event.which);
          const position = this.$modelvalueArray.length;
          if (this.$modelvalueArray.length < 9) {
            this.$modelvalueArray[position] = value;
            this.updateView(input);
          }
         
          
        }
        const back = (event.which === 8);
        if (back) {

          if (this.$modelvalueArray.length) {
            this.$modelvalueArray.pop();
            this.updateView(input);

          }

        }
       

      });

    $keyUpEvent.subscribe();


      
      
    console.log(this.inputElement.nativeElement);
  }

}
