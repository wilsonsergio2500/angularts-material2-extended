
import { Component, Input, ElementRef, OnInit, ViewChild, OnDestroy, forwardRef } from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  ControlValueAccessor,
  FormControl
} from '@angular/forms';
import { MatInput } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/merge';

const ARROWS = {
  RIGHT: 'ArrowRight',
  LEFT: 'ArrowLeft',
  UP: 'ArrowUp',
  DOWN: 'ArrowDown',
  HOME: 'Home',
  END: 'End'
};

const delay = (call: () => void, ms: number = 1): Promise<void> => {
  const dl = new Promise<void>((rs) => setTimeout(rs, ms));
  return dl.then(call);
}



const mask: string[] = ['_', '_', '_', '-', '_', '_', '-', '_', '_', '_', '_'];
const EMPTY_MASK = '___-__-____';
const HIDE_CHARACTER = '*';

export const SNN_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SsnInputComponet),
  multi: true,
};
export const SNN_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => SsnInputComponet),
  multi: true,
};
/*
usage:
  <ssn-input placeholder="Enter Social Security" [HideValue]="true" [formControl]="SnnFormControl" [required]="true" [DisplayToggle]="true"></ssn-input>
*/


@Component({
  selector: 'ssn-input',
  templateUrl: 'ssn-input.component.html',
  styleUrls: ['snn-input.style.css'],
  providers: [SNN_VALUE_ACCESSOR, SNN_VALIDATOR]
})

export class SsnInputComponet implements ControlValueAccessor, OnInit, OnDestroy {

  private disabled: boolean;
  private $modelvalue = '';
  private $modelvalueArray: string[] = [];
  private $viewvalue: string = EMPTY_MASK;
  private Subscribers: Subscription[];
  private touched = false;

  @Input() placeholder: string;
  @Input() HideValue: boolean = false;
  @Input() required: boolean;
  @Input() DisplayToggle = true;

  @ViewChild('input')
  private inputElement: ElementRef;

  @ViewChild(MatInput)
  private matInputElement: MatInput;

  propagateChange = (_: any) => { };
  propagateTouched = () => { };
  

  constructor(private elementRef: ElementRef) {

  }


  writeValue(value: string): void {
    if (!!value) {
      this.$modelvalue = value;
      this.$modelvalueArray = this.$modelvalue.split('');
      this.$viewvalue = this.getMask(this.$modelvalueArray);
    }
    
  }

  validate() {
    
    if (this.required ) {
      const valid = this.$modelvalueArray.length === 9;
      if (this.touched) {
        this.matInputElement.errorState = !valid;
      }
      return valid ? null : { required: true };
    }

    return null;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn) {
    this.propagateTouched = fn;
  }
  onTouched() {
    this.touched = true;
    this.validate();
    this.propagateTouched();
  }

  Toggle() {
    this.HideValue = !this.HideValue;
    delay(() => this.updateView(this.inputElement.nativeElement));
  }

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
    
  }

  async updateView(input: HTMLInputElement) {

    await delay(() => this.$viewvalue = this.getMask(this.$modelvalueArray, this.HideValue));
    await delay(() => this.setCursorPosition(input), 2);
    await delay(this.$setModel.bind(this), 2)
      .then(this.propagateTouched);
      

   
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
    
    const $onEntryEvents = Observable.merge(Observable.fromEvent(el, 'click'), Observable.fromEvent(el, 'focus'))
      .do((event: KeyboardEvent) => {

        const input = (event.target as HTMLInputElement);
        this.setCursorPosition(input);
       
      });


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

    this.Subscribers = [
      $keydownEvent.subscribe(),
      $onEntryEvents.subscribe(),
      $keyUpEvent.subscribe()

    ]; 

  }

  ngOnDestroy() {
    this.Subscribers.forEach((subs: Subscription) => subs.unsubscribe());
  }
}
