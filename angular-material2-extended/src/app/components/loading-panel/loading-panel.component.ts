
import { Component, Input, OnInit, ElementRef, OnChanges } from '@angular/core';

/**
 * usage:
<loading-panel [IsBusy]="true">
          <div style="width:200px; height:200px; border: 1px solid; border-color: lightgray">
            <p style="padding:6px;">This border is produced by the transluded element. The loading-panel has no inherited border style.</p>
          </div>
      </loading-panel>
 */

@Component({
    selector: 'loading-panel',
    templateUrl: 'loading-panel.component.html',
    styles: [`
        :host{
            display: inline-block;
            position: relative;
        }
        .loading-panel{
            background-color:rgba(255,255,255,0.5); position:absolute; top:1px;text-align:center; display:inline-block;
        }
        .loading-signal{
            display:inline-block; position:absolute; 
        }
    `]
})
export class LoadingPanelComponent implements OnInit {

    @Input()
    private IsBusy: boolean;

   

    constructor(private element: ElementRef) {
    }

    private minimun = 20;
    private dimensions = { width: 0, height: 0 };
    private diameter = 0;
    private horizontalCenter = 0;
    private verticalCenter = 0;
    ngOnInit() {
        const ele = this.element.nativeElement as HTMLElement;

        this.dimensions.width = ele.clientWidth;
        this.dimensions.height = ele.clientHeight;

        const limit = Math.min(this.dimensions.width, this.dimensions.height);
        const diameter = Math.max(limit * 0.3, this.minimun);
        this.diameter = diameter;

        const hc = Math.abs((this.dimensions.width * 0.5) - ((limit * 0.30) / 2));
        const vc = Math.abs((this.dimensions.height * 0.5) - ((limit * 0.30) / 2));
        this.horizontalCenter = hc;
        this.verticalCenter = vc;

    }
}
