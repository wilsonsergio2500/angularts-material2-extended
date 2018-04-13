
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
  END: 'End',
  BACKSPACE: 'Backspace'
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
  <ssn-input placeholder="Enter Social Security" [HideValue]="true" [formControl]="SnnFormControl" [disabled]="false"
                   [required]="true"
                   [Last4Only]="true"
                   [DisplayToggle]="true"></ssn-input>
*/


@Component({
  selector: 'ssn-input',
  templateUrl: 'ssn-input.component.html',
  styleUrls: ['snn-input.style.css'],
  providers: [SNN_VALUE_ACCESSOR, SNN_VALIDATOR]
})

export class SsnInputComponet implements ControlValueAccessor, OnInit, OnDestroy {

  private _disabled: boolean = false;
  private $modelvalue = '';
  private $modelvalueArray: string[] = [];
  private $viewvalue: string = EMPTY_MASK;
  private Subscribers: Subscription[];
  private touched = false;

  @Input() placeholder: string;
  @Input() HideValue: boolean = false;
  @Input() required: boolean;
  @Input() DisplayToggle = true;
  @Input() Last4Only = false;
  @Input('disabled') set disable(val: boolean){
    this._disabled = val;
  }

  @ViewChild('input')
  private inputElement: ElementRef;

  @ViewChild(MatInput)
  private matInputElement: MatInput;

  propagateChange = (_: any) => { };
  propagateTouched = () => { };

  private ovalue = '';
  private nvalue = ''

  constructor(private elementRef: ElementRef) {

  }


  writeValue(value: string): void {
    if (!!value) {
      this.$modelvalue = value;
      this.$modelvalueArray = this.$modelvalue.split('');
      this.$viewvalue = this.getMask(this.$modelvalueArray, this.HideValue);
      console.log(this.$viewvalue);
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
    console.log(isDisabled)
    this._disabled = isDisabled;
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
    setTimeout(() => input.setSelectionRange(pos, pos), 1);
  }
  getMask(vals: string[], hidden = false) {
    const msk = [...mask];
    let counter = 0;
    mask.map((item: string, index: number) => ({ item, index }))
      .filter((el) => el.item !== '-' )
      .forEach((el) => {
        if (vals.length) {
          msk[el.index] = (!!vals[counter]) ? ( (hidden) ? HIDE_CHARACTER : vals[counter]) : mask[el.index];
          msk[el.index] = (this.Last4Only && hidden && counter > 4 && !!vals[counter]) ? vals[counter] : msk[el.index];
          counter++;
        }

      });
    const response = msk.slice(0, 11).join('');
    return response;
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

  update(input: HTMLInputElement) {
     delay(() => {
      this.$viewvalue = this.getMask(this.$modelvalueArray, this.HideValue);
      this.setCursorPosition(input);
      this.$setModel();
      this.propagateTouched();
    }, 1)
  }

  ngOnInit() {

    const el = this.inputElement.nativeElement;


    const $keydown = Observable.fromEvent(el, 'keydown').do((event: KeyboardEvent) => {
      console.log('kd - ' + event.key+ ':' + event.which);
      if (event.key == ARROWS.BACKSPACE) {
        if (this.$modelvalueArray.length) {
          this.$modelvalueArray.pop();
          const input = (event.target as HTMLInputElement);
          this.updateView(input);

        }
      }
      

    })

    const $keypress = Observable.fromEvent(el, 'keyup') // it was keydown
      .map((event: KeyboardEvent) => {


        const numeric = (event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)
          || (event.keyCode === 8);
        const preventable = event.key === ARROWS.LEFT || event.key === ARROWS.RIGHT || event.key === ARROWS.HOME
          || event.key === ARROWS.END
          || event.key === ARROWS.UP
          || event.key === ARROWS.DOWN
          || numeric === false;

        

        if (navigator.userAgent.match(/Android/i)) {
          return event;
        }
       
        if (!preventable) {
          return event
        }
        
      }
    ).do((event: KeyboardEvent) => {

      if (!!event) {

        const LIMIT = 9;
        const numeric = (event.which >= 48 && event.which <= 57) || (event.which >= 96 && event.which <= 105);
        const input = (event.target as HTMLInputElement);

      
        const cursor = input.value.slice(0, input.selectionStart).length + 1;

        if (cursor === 1 && this.$modelvalueArray.length === LIMIT) {
          this.$modelvalueArray = [];
        }


        const forcevalue = () => {
          delay(() => input.value = this.$viewvalue);
        }

        const tx = input.value;
        const prevent = (tx.length > mask.length) && (this.$modelvalueArray.length === LIMIT);
        if (prevent)
        {
          forcevalue();
          this.updateView(input);
          return;
        }
     

        if (navigator.userAgent.match(/Android/i)) {

          console.log(cursor);
          const pox = cursor - 2;
          const last = input.value.charAt(pox);
          const allowed = (isNaN(parseInt(last, 10)) === false || last === "*" || last === "-");
          if (allowed) {

            const reversed = input.value.replace(/-/g, '').replace(/_/g, '').split('').reverse();
            const array = [...reversed];
            const size = array.length;
            const position = array.findIndex((g, index) => isNaN(parseInt(g, 10)) === false);if (size > 0) {
              const add = size > this.$modelvalueArray.length;
              console.log(size, this.$modelvalueArray.length);
              if (add) {
                if (this.$modelvalueArray.length < LIMIT) {
                  const entry = array[position];
                  this.$modelvalueArray[this.$modelvalueArray.length] = entry;
                }
              } else {
                this.$modelvalueArray = this.$modelvalueArray.slice(0, size);
                console.log(this.$modelvalueArray)
              }
              delay(() => {
                this.$viewvalue = this.getMask(this.$modelvalueArray, this.HideValue);
                this.$setModel();
                delay(() => {
                  const newpos = this.getCursor(input.value);
                  input.setSelectionRange(newpos, newpos);
                });
              }, 100);
            }
        

          } else {
            if (cursor === 1) {
              this.$modelvalueArray = [];
            }
            forcevalue();
            this.$viewvalue = this.getMask(this.$modelvalueArray, this.HideValue);
            this.$setModel();
            
          }
          delay(() => {
            const newpos = this.getCursor(input.value);
            input.setSelectionRange(newpos, newpos);
          })
          this.propagateTouched();
          
                 


        }

        else {


          if (numeric) {

            const value = (event.which >= 96 && event.which <= 105)
              ? String.fromCharCode(event.which - 48)
              : String.fromCharCode(event.which);
            const position = this.$modelvalueArray.length;




            if (this.$modelvalueArray.length < LIMIT) {
              this.$modelvalueArray[position] = value;
              this.updateView(input);
            }


          }
        }
               


      }

      });
    


    //const $keydownEvent = Observable.fromEvent(el, 'keydown') // it was keydown
    //  .map((event: KeyboardEvent) => {
    //    const allowed = (event.keyCode == 229);
    //    const numeric = (event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105)
    //      || (event.keyCode === 8);
    //    const preventable = event.key === ARROWS.LEFT || event.key === ARROWS.RIGHT || event.key === ARROWS.HOME
    //      || event.key === ARROWS.END
    //      || event.key === ARROWS.UP
    //      || event.key === ARROWS.DOWN
    //      || numeric === false || allowed == false;
          

    //    if (preventable) {
    //      return event;
    //    }
    //  }
    //).do((event: Event) => (event) && event.preventDefault());


    
    const $onEntryEvents = Observable.merge(Observable.fromEvent(el, 'click'), Observable.fromEvent(el, 'focus'))
      .do((event: KeyboardEvent) => {

        const input = (event.target as HTMLInputElement);
        this.setCursorPosition(input);
       
      });


    //const $keyUpEvent = Observable.fromEvent(this.inputElement.nativeElement, 'keyup')
    //  .do((event: KeyboardEvent) => {

    //    const input = (event.target as HTMLInputElement);
    //    const numeric = (event.keyCode >= 48 && event.keyCode <= 57) || (event.keyCode >= 96 && event.keyCode <= 105);

    //    console.log(event.charCode)
        

    //    const cursor = input.value.slice(0, input.selectionStart).length;
    //    if(cursor === 1 && this.$modelvalueArray.length === 9){
    //        this.$modelvalueArray = [];
    //    }

    //    if (numeric) {
          
    //      const value = (event.which >= 96 && event.which <= 105)
    //        ? String.fromCharCode(event.which - 48)
    //        : String.fromCharCode(event.which);
    //      const position = this.$modelvalueArray.length;
    //      if (this.$modelvalueArray.length < 9) {
    //        this.$modelvalueArray[position] = value;
    //        this.updateView(input);
    //      }
         
          
    //    }
    //    const back = (event.which === 8);
    //    if (back) {

    //      if (this.$modelvalueArray.length) {
    //        this.$modelvalueArray.pop();
    //        this.updateView(input);

    //      }

    //    }
       

    //  });

    this.Subscribers = [
      $keydown.subscribe(),
     
      $keypress.subscribe(),

      //$keydownEvent.subscribe(),
      $onEntryEvents.subscribe(),
      //$keyUpEvent.subscribe(),

    ]; 

  }

  ngOnDestroy() {
    this.Subscribers.forEach((subs: Subscription) => subs.unsubscribe());
  }
}
