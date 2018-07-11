
import { Component, Input, OnInit, ViewChild, ElementRef, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { FormlyStepper, IFormlyStepper, IFormlyStepperItem } from './models/FormlyStepper';

/**
 * usage:
    <formly-stepper [FormlyStepper]="Forms" [StepperType]="1"
                [HideHeader]="false"
                [Busy]="IsWorking"
                (OnCompleted)="Complete($event)"></formly-stepper>
 */

@Component({
  selector: 'formly-stepper',
  templateUrl: 'formly-stepper.component.html',
  styles: [`
    :host ::ng-deep .btn-region{
      display: inline-block;
      float: right;
    }
  :host ::ng-deep .mat-horizontal-stepper-content{
      position: relative;
    }
  :host ::ng-deep .btn-prior{
      position: absolute;
      bottom: 1px;
    }
   :host ::ng-deep  .mat-horizontal-stepper-header{
      pointer-events: none;
    }
  `]

})
export class FormlyStepperComponent implements OnInit, AfterViewInit {

  @Input()
  private FormlyStepper: IFormlyStepper<any>;
  @Input()
  StepperType: number = 1;

  @ViewChild('nextBtn', { read: ElementRef })
  private nxtbtn: ElementRef;

  @Input('Busy')
  public Busy: boolean;

  @Input()
  public HideHeader: boolean = false;

  @Output()
  private OnCompleted: EventEmitter<any> = new EventEmitter<any>();

  constructor(private element: ElementRef) {
    
  }
  Submit($event: any,last: boolean) {
    if (last) {
      this.OnCompleted.emit({ $model: this.FormlyStepper.Model });
    } else {
      (this.nxtbtn.nativeElement as HTMLButtonElement).click();
    }
  }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    const header : HTMLDivElement = this.element.nativeElement.querySelector('.mat-horizontal-stepper-header-container');
    if (!!this.HideHeader) {
      header.style.display = 'none';
    }
  }

}
