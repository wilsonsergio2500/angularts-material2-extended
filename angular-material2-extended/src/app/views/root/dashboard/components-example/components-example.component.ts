
import { Component } from '@angular/core';

@Component({
  selector: 'components-example',
  templateUrl: 'components-example.component.html'
})
export class ComponentsExampleComponent {

  working: boolean;
  constructor(){
    this.working = false;
  }

  Submit($event: any){
    this.working = true;
    setTimeout(() => {
      this.working = false;
    }, 8000)
  }
}
