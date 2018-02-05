
import {
  Component, ElementRef, Input, Output, EventEmitter, ViewChildren, ViewChild, OnInit, OnDestroy, AfterViewInit,
  NgZone
} from '@angular/core';
import { IResponsiveDimension } from './models/IResponsiveDimension';
import { IGridVS, GridVS } from './models/GridVS';
import { ChangeEvent, VirtualScrollComponent } from 'angular2-virtual-scroll';
import { ResizeSubscriber, IElementResized} from '../../utility/ResizeSubscriber';


const DefaultDimensions: IResponsiveDimension[] = [
  { minWidth: 1200, cols: 5 },
  { minWidth: 900, cols: 3 },
  { minWidth: 600, cols: 2 },
  { minWidth: 300, cols: 1 }
];

const GetTileWidth = (ResponsiveDimensions: IResponsiveDimension[], containerWidth: number) => {
  let width = 0;
  ResponsiveDimensions.every((dimension: IResponsiveDimension, index: number) => {
    if (dimension.minWidth < containerWidth) {
      width = Math.round(Math.round(containerWidth * 0.96) / dimension.cols);
      return false;
    }
    return true;
  });
  return width;
};

@Component({
  selector: 'virtual-scroll-extended',
  templateUrl: 'virtual-scroll-extended.component.html',
  styles: [`
      :host{
          flex: 1 1 100%;
          box-sizing: border-box;
          max-height: 100%;
          position: relative;
        }
  `]
})
export class VirtualScrollExtendedComponent implements OnInit, OnDestroy, AfterViewInit {

  private ResizedSubscriber: ResizeSubscriber;
  private current  = [];

  @Input() ResponsiveDimensions: IResponsiveDimension[] = DefaultDimensions;
  @Input() GridVs: IGridVS<any>;

  @Output()
  update: EventEmitter<any[]> = new EventEmitter<any[]>();

  @Output()
  OnEndScroll: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('scrollingBlock')
  scrollingBlock: ElementRef;

  @ViewChild(VirtualScrollComponent)
  private virtualScroll: VirtualScrollComponent;

  constructor(private element: ElementRef, private zone: NgZone) {
  }

  onVsEnd($event: ChangeEvent) {
    if ($event.end === this.GridVs.getTotalCount()) {
      this.OnEndScroll.emit();
    }
  }
  onViewPortEmit($event: any[]) {
    this.current = $event;
    this.update.emit($event);
  }
  ngOnInit(): void {
    this.ResizedSubscriber = new ResizeSubscriber();
    this.ResizedSubscriber.Subscribe(this.scrollingBlock.nativeElement as HTMLElement, this.OnResized.bind(this));
  }
  OnResized(resized: IElementResized) {

    const newwidth = GetTileWidth(this.ResponsiveDimensions, resized.width);
    this.zone.run(() => {
      this.GridVs.setWidth(newwidth);
      this.virtualScroll.refresh();
      this.virtualScroll.scrollInto(this.current);
    });
 
  }


  ngOnDestroy(): void {
    this.ResizedSubscriber.Unsubscribe();
  }

  ngAfterViewInit() {
  }
}
