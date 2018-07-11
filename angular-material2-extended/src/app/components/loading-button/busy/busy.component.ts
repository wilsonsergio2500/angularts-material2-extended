import { Component, OnInit, Host } from '@angular/core';
import { LoadingButton } from '../loading-button.component';

@Component({
    selector: 'loading-button-busy',
    templateUrl: 'busy.component.html',
    
    
})
export class LoadingButtonBusyComponent implements OnInit {

    ngOnInit() {

    }
    parentContext: LoadingButton
    constructor(@Host() parent: LoadingButton) {
        this.parentContext = parent;
    }
}
