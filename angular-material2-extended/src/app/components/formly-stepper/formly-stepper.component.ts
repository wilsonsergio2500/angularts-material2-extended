
import { Component, Input, OnInit } from '@angular/core';
import { FormlyStepper, IFormlyStepper, IFormlyStepperItem } from './models/FormlyStepper';

@Component({
  selector: 'formly-stepper',
  templateUrl: 'formly-stepper.component.html'

})
export class FormlyStepperComponent implements OnInit {

  @Input()
  private FormlyStepper: IFormlyStepper<any>;
  @Input()
  private StepperType: number = 1;

  constructor() {
    
  }

  ngOnInit() {
    console.log(this.FormlyStepper);
  }

}
