
import { Component } from '@angular/core';

@Component({
  selector: 'root',
  templateUrl: 'root.component.html',
  styles: [`
      :host {
        display: block;
        height: 100%;
      }
  `]
})

export class RootComponent {

  constructor() {
  }
}
