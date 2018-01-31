
import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import * as elementResizeDetectorMaker from 'element-resize-detector';
import { GridVS, IGridVS } from '../components/virtual-scroll-extended/models/GridVS';


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
  
  GridVs: IGridVS<any>;
  Buffer: any[];
  constructor(private element: ElementRef) {

    this.InitRecords();
  }
  InitRecords() {
    const items = [];
    for (let i = 0; i < 1000; i++) {
      items.push({ id: i, name: `My name ${i}`, lastname: `My Last name ${i}` });
    }

  
    this.GridVs = new GridVS<any>(items);
    this.Buffer = this.GridVs.Take(300);
    
  }

  ngOnInit() {
    this.contentholder = (this.element.nativeElement as HTMLDivElement).querySelector('[contenthold]') as HTMLDivElement;
    this.resizeDetector = elementResizeDetectorMaker();
    //this.resizeDetector.listenTo(this.contentholder, this.OnResize.bind(this));
  }
  ngOnDestroy() {
    this.resizeDetector.removeAllListeners(this.contentholder);
  }

  OnResize(element: HTMLDivElement) {

    console.log('resized');
    console.log(element.clientWidth, element.clientHeight);
  }
  onVsEnd($event: any) {
    console.log($event);
  }

  onScrollEnd() {
    console.log('scroll end..');
  }
  
}
