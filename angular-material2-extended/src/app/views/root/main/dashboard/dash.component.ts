
import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import * as elementResizeDetectorMaker from 'element-resize-detector';


@Component({
  selector: 'dash-component',
  templateUrl: 'dash.component.html',
  styles: [`
      :host {
        display: block;
        height: 100%;
      }
  `]
})
export class DashComponent implements OnInit, OnDestroy {

  contentholder: HTMLDivElement;
  resizeDetector: elementResizeDetectorMaker.Erd;
  

  constructor(private element: ElementRef) {
    
  }

  ngOnInit() {
    this.contentholder = (this.element.nativeElement as HTMLDivElement).querySelector('[contenthold]') as HTMLDivElement;
    this.resizeDetector = elementResizeDetectorMaker();
    this.resizeDetector.listenTo(this.contentholder, this.OnResize.bind(this));
  }
  ngOnDestroy() {
    this.resizeDetector.removeAllListeners(this.contentholder);
  }

  OnResize(element: HTMLDivElement) {

    console.log('resized');
    console.log(element.clientWidth, element.clientHeight);
  }
  
}
