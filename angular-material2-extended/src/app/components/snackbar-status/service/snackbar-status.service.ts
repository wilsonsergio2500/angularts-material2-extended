import {  Injectable  } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

import { CompletedSnackbarComponent } from '../types/completed/snackbar-completed.component';
import { ProgressSnackbarComponent } from '../types/progress/snackbar-progress.component';

@Injectable()
export class SnackbarStatusService{

   constructor(private snackbar: MatSnackBar){

    }

  OpenProgress(msg?: string, duration = 900000) {
        const message = msg || 'Loading...';
    this.snackbar.openFromComponent(ProgressSnackbarComponent, <MatSnackBarConfig>{
      duration: duration, data: { message }, horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
    }

    CloseStatus() {
        this.snackbar.dismiss();
    }

  OpenComplete(msg?: string, duration = 900000){
        const message = msg || 'Action completed!';
    this.snackbar.openFromComponent(CompletedSnackbarComponent, <MatSnackBarConfig>{
      duration: duration, data: { message },
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
    }
}
