
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

  @Output()
    onFormSubmit: EventEmitter<T> = new EventEmitter<T>();

  constructor() {
    console.log(this.formlyGroup);
  }

  submit(){
    this.onFormSubmit.emit(this.formlyGroup.model);
  }


}
