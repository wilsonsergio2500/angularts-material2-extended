
import { Component } from '@angular/core';
import { SnackbarStatusService } from '../../../../components/snackbar-status/service/snackbar-status.service';

@Component({
  selector: 'components-example',
  templateUrl: 'components-example.component.html'
})
export class ComponentsExampleComponent {

  working: boolean;
  
  constructor(private snackbarStatusService: SnackbarStatusService){
    this.working = false;
  }

  Submit($event: any){
    this.working = true;
    setTimeout(() => {
      this.working = false;
    }, 8000)
  }

  ShowProgress(){
    this.snackbarStatusService.OpenProgress('Loading...')
    setTimeout(() => {
      this.snackbarStatusService.CloseStatus();
    }, 8000)
  }
  ShowCompleted(){
    this.snackbarStatusService.OpenComplete('Action Completed')
    setTimeout(()=> {
      this.snackbarStatusService.CloseStatus();
    }, 8000)
  }
}
