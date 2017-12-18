
import { Component } from '@angular/core';

@Component({
  selector: 'form-builder-example',
  templateUrl: 'form-builder-example.component.html',
  styles: [
    `
      :host{
            display: flex;
          flex-flow: column;
          flex: 1 1 auto;
          height: 100%;
      }
    `
    ]
})
export class FormBuilderExampleComponent{
  constructor(){
  }
}
