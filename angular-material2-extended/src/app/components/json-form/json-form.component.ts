
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IFormlyGroup} from '../../fomly-fields/IFormlyGroup';

@Component({
  selector: 'json-form',
  templateUrl: 'json-form.component.html'
})
export class JsonFormComponent<T>{

  @Input()
    formlyGroup: IFormlyGroup<T>;

  @Input()
    IsWorking: boolean;

  @Input('btn-ready')
    btnReady: string;

   @Input('btn-busy')
  btnBusy: string;

   @Input('show-revert-btn')
   showRevertBtn: boolean = true;

  @Output()
    onFormSubmit: EventEmitter<T> = new EventEmitter<T>();

  constructor() {
  }

  submit(){
    this.onFormSubmit.emit(this.formlyGroup.model);
  }


}
