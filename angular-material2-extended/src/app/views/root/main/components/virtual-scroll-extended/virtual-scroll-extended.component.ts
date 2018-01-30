
import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'virtual-scroll-extended',
  templateUrl: 'virtual-scroll-extended.component.html'
})
export class VirtualScrollExtendedComponent {

  constructor(private element: ElementRef) {
  }
}
