import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';

/**
 * usage:
 <loading-button [IsBusy]="working" (onSubmit)="Submit($event)"  mat-raised-button  type="button">
        <loading-button-ready>
            Save
        </loading-button-ready>
        <loading-button-busy>
            Loading...
        </loading-button-busy>
    </loading-button>
 */

const materialButtonAttrs = [
    'mat-button',
    'mat-raised-button',
    'mat-icon-button',
    'mat-fab',
    'mat-mini-fab'
];

@Component({
    selector: 'loading-button',
    templateUrl: 'loading-button.component.html',
    styles: [
        `
        :host{
            -webkit-appearance: none !important;
        }
        button[type="button"]{
            -webkit-appearance: none;
        }
        button[type="submit"]{
                    -webkit-appearance: none;
        }
        
        `
    ]
})

export class LoadingButton implements OnInit {

    @Input('IsBusy')
    public IsWorking: boolean;

    private class: string = '';
    private buttonType: string = 'button';
    private color: string = 'primary'

    @Output()
    private onSubmit: EventEmitter<any> = new EventEmitter <any>();

    constructor(element: ElementRef) {
        const nativeEl = element.nativeElement as HTMLElement;

        materialButtonAttrs.forEach((attr, index) => {

            if (nativeEl.hasAttribute(attr)) {
                this.class = `${attr} ${this.class}`
            }
            
        })

        if (nativeEl.hasAttribute('type')) {
            this.buttonType = nativeEl.getAttribute('type');
            
        }

        if (nativeEl.hasAttribute('color')) {
            this.color = nativeEl.getAttribute('color')
        }
        
        
    }
    ngOnInit() {
      
    }
    onClick($ev: any) {
       
        this.onSubmit.emit($ev);
    }

}
