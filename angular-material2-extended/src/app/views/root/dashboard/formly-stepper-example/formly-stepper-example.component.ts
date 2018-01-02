
import { Component } from '@angular/core';
import { FormlyStepper, IFormlyStepper, IFormlyStepperItem } from '../../../../components/formly-stepper/models/FormlyStepper';
import { STEP1  } from './steps/step1';
import { STEP2 } from './steps/step2';

@Component({
  selector: 'formly-stepper-example',
  templateUrl: 'formly-stepper-example.component.html'
})
export class FormlyStepperExampleComponent {

  Forms: IFormlyStepper<any> = new FormlyStepper<any>([
    <IFormlyStepperItem>{
      Label: 'Step 1',
      Fields: STEP1
    },
    <IFormlyStepperItem>{
      Label: 'Step 2',
      Fields: STEP2
    }
  ]);

  constructor() {

    //this.Forms = new FormlyStepper<any>([
    //  <IFormlyStepperItem>{
    //    Label: 'Step 1',
    //    Fields: STEP1
    //  },
    //  <IFormlyStepperItem>{
    //    Label: 'Step 2',
    //    Fields: STEP2
    //  }
    //]);

    console.log(this.Forms);
  }
}
