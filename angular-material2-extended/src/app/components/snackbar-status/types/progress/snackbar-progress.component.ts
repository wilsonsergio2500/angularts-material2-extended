import { Component, Inject} from '@angular/core';
import { SnackbarStatusBase} from '../../snackbar-status-base';
import { styles } from '../../styles';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'progress-snackbar',
  templateUrl: 'snackbar-progress.component.html',
  styles
})

export class ProgressSnackbarComponent extends SnackbarStatusBase{

 
}
